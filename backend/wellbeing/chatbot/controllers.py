from flask_jwt_extended import current_user
from sqlalchemy.sql import and_
from serpapi import GoogleSearch
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import yake
import pandas as pd

from wellbeing.extensions import db
from wellbeing.QA.models import QA
from wellbeing.chatbot.models import UserQuestion

'''
Chatbot Helper Functions
'''

api_key = "a61426918f7c9cef90b28d2a60e02f67487437422290708c44910c98587d1393"
# Google API search
def serch_func(q, prefix, num):
    q_prefix = q + prefix
    params = {
        "api_key": api_key,
        "engine": "google",
        "q": q_prefix,
        "google_domain": "google.com",
        "hl": "en",
        "num":10
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    res = []
    if len(results["organic_results"]) < num:
        num = len(results["organic_results"])
    for msg in range(num):
        res.append({"text":results["organic_results"][msg]["title"], "herf":results["organic_results"][msg]["link"]})  
    return res


# DB return top3 matching qa ids
def rank_matching_qa(id_list, category_list, title_list, body_list, q):
    rates = []
    for body in body_list:
        rates.append(fuzz.ratio(q,body))
    res = list(zip(id_list, category_list, title_list, body_list, rates))
    df_res = pd.DataFrame(res)
    return df_res


# Remove duplicated results
def remove_duplication(cur, prev, key):
    differences = []
    for i in cur[key]:
        if i not in prev[key]:
            differences.append(i)
    return differences


def key_word_extraction(text):
    kw_extractor = yake.KeywordExtractor()
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.9
    numOfKeywords = 1

    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
    keywords = custom_kw_extractor.extract_keywords(text)
    return keywords[0][0]


# step 1: video or guide
# if "video": return youtube video link
# if "guide": return 1-3 QA from db
#             return 1-3 external link from gov unsw org
def state2_response(type, question):
    response_video = {}
    response_guide = {}

    if type == "video":
        response_video['link'] = serch_func(question, "youtube", 5)
        return response_video

    elif type == "guide":
        # QA ids and category_ids from db
        qa_list = QA.query.all()

        # case 1: extract question keyword to match
        q_keyword = key_word_extraction(question)
        df_res = rank_matching_qa([qa.id for qa in qa_list],[qa.category_id for qa in qa_list],[qa.title for qa in qa_list] ,[qa.body for qa in qa_list], q_keyword)
        # return str(q_keyword)
        
        # only qa matching_rank >= 50 will be returned          --          turn out not matching the keyword
        # df_res = df_res[df_res[3] >= 50]

        top3_id_list = df_res.sort_values(by=[4],ascending=False)[:3]
        qa_id_cat = []
        for idx in range(len(top3_id_list)):
            qa_id_cat.append({"id":list(top3_id_list[0])[idx], "category_id":list(top3_id_list[1])[idx], "question":list(top3_id_list[2])[idx] })
        response_guide['QAs'] = qa_id_cat

        # gov
        response_guide['link'] = serch_func(question, "gov au", 3)
        # unsw
        #response_guide['link'] = response_guide.get("link", []) + serch_func(question, "unsw au", 3)
        # org
        response_guide['link'] = response_guide.get("link", []) + serch_func(question, "org au", 3) 
        return response_guide


# only return when user puts in "related"
def state3_response(status, question):

    # status update
    u_q = UserQuestion.query.filter_by(user_id=current_user.id).order_by(UserQuestion.created_at.desc()).first_or_404()
    u_q.status = status
    db.session.commit()

    if status != "related":
        return {'message': 'User Input ' + status}

    response_list_related = {}
    params = {
        "api_key": api_key,
        "engine": "google",
        "q": question,
        "google_domain": "google.com",
        "hl": "en",
        "num":10
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    # if this question has no related question, extract the key word from this question
    # search again -- one word search is guaranteed to have related_questions
    if "related_questions" not in results.keys():
        key_word = key_word_extraction(question)
        params = {
            "api_key": api_key,
            "engine": "google",
            "q": key_word,
            "google_domain": "google.com",
            "hl": "en",
            "num":10
        }
        search = GoogleSearch(params)
        results = search.get_dict()

    res = {}
    if "related_questions" not in results.keys():
        return []
    else:
        res['text'] = [f"{result['question']}"  for result in results["related_questions"][:3]]
    return res


# state 1 inserting into db
def state1_response(user_id, question):
    new_user_question = UserQuestion(
        question_description=question,
        user_id=user_id
    )
    db.session.add(new_user_question)
    db.session.commit()
    return {'message': 'User Question Stored'}


'''
Chatbot Controllers
'''


def state_response(data):
    if data['state'] == 1:
        return state1_response(current_user.id, data['input_text'])

    u_question = UserQuestion.query.filter_by(user_id=current_user.id).order_by(UserQuestion.created_at.desc()).first_or_404()
    current_q = u_question.question_description
    if data['state'] == 2:
        all_user_qs = UserQuestion.query.filter_by(user_id=current_user.id).all()
        # if more than one questions have been asked
        # we check the status of the previous question
        if len([user_qs.question_description for user_qs in all_user_qs]) == 1:
            return state2_response(data['input_text'], current_q)
        else:
            # get prev and current dict of responses base on created_at
            previous_q_status = [user_qs.status for user_qs in all_user_qs][-2]
            previous_q_description = [user_qs.question_description for user_qs in all_user_qs][-2]
            
            # user asked the same question again
            if previous_q_description == current_q:
                return state2_response(data['input_text'], current_q)

            # compare only if status != True
            if previous_q_status == "True":
                return state2_response(data['input_text'], current_q) 
            
            cur_response = state2_response(data['input_text'], current_q)
            prev_response = state2_response(data['input_text'], previous_q_description)

            res = {}
            if (data['input_text'] == "guide"):
                res['QAs'] = cur_response['QAs']
            
            
            res['link'] = remove_duplication(cur_response, prev_response, "link")
            return res

    elif data['state'] == 3:
        return state3_response(data['input_text'], current_q)

    









    