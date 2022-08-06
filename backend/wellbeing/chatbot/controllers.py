from flask_jwt_extended import current_user
from sqlalchemy.sql import and_
from serpapi import GoogleSearch
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import pandas as pd

from wellbeing.extensions import db
from wellbeing.QA.models import QA
from wellbeing.chatbot.models import UserQuestion

'''
Chatbot Helper Functions
'''


# Google API search
def serch_func(q, prefix, num):
    q_prefix = q + prefix
    params = {
        "api_key": "265f3c070749db61ef93605f55157c265d83b73a31d203ce7c9860575047adef",
        "engine": "google",
        "q": q_prefix,
        "google_domain": "google.com",
        "hl": "en",
        "num":10
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    res = []
    for msg in range(num):
        res.append({"text":results["organic_results"][msg]["title"], "herf":results["organic_results"][msg]["link"]})
        
    return res


# DB return top3 matching qa ids
def rank_matching_qa(id_list, category_list, title_list, q):
    rates = []
    for title in title_list:
        rates.append(fuzz.ratio(q,title))
    res = list(zip(id_list, category_list, title_list, rates))
    df_res = pd.DataFrame(res)

    return df_res


# Remove duplicated results
def remove_duplication(cur, prev, key):
    differences = []
    for i in cur[key]:
        if i not in prev[key]:
            differences.append(i)
    return differences


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
        df_res = rank_matching_qa([qa.id for qa in qa_list],[qa.category_id for qa in qa_list], [qa.title for qa in qa_list], question)
        # only rank >= 50 will be returned
        df_res = df_res[df_res[3] >= 50]
        top3_id_list = df_res.sort_values(by=[3],ascending=False)[:3]
        qa_id_cat = []
        for idx in range(len(top3_id_list)):
            qa_id_cat.append({"id":list(top3_id_list[0])[idx], "category_id":list(top3_id_list[1])[idx]})
        response_guide['QAs'] = qa_id_cat

        # gov
        response_guide['link'] = serch_func(question, "gov au", 3)
        # unsw
        response_guide['link'] = response_guide.get("link", []) + serch_func(question, "unsw au", 3)
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
        return ""

    response_list_related = {}
    params = {
        "api_key": "265f3c070749db61ef93605f55157c265d83b73a31d203ce7c9860575047adef",
        "engine": "google",
        "q": question,
        "google_domain": "google.com",
        "hl": "en",
        "num":10
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    if "related_questions" not in results.keys():
        return []

    res = {}
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
        if u_question.id == 1:
            return state2_response(data['input_text'], current_q)
        else:
            # get prev and current dict of responses
            previous_q = UserQuestion.query.filter_by(id=u_question.id-1).first_or_404()
            # compare only if status != True
            if previous_q.status == "True":
                return state2_response(data['input_text'], current_q) 

            cur_response = state2_response(data['input_text'], current_q)
            prev_response = state2_response(data['input_text'], previous_q.question_description)

            res = {}
            if data['input_text'] == "guide":
                res['QAs'] = remove_duplication(cur_response, prev_response, "QAs")
            res['link'] = remove_duplication(cur_response, prev_response, "link")
            return res

    elif data['state'] == 3:
        return state3_response(data['input_text'], current_q)

    









    