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


def serch_func(response, q, prefix, num):
    q_prefix = q + prefix
    params = {
        "api_key": "10f8b30bda3da92367f393ba85209c5de69a9eb33cb75a9396a47d0a35a81cf6",
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
        
    response['link'] = res
    return response


def rank_matching_qa(id_list, title_list, q):
    rates = []
    for title in title_list:
        rates.append(fuzz.ratio(q,title))
    res = list(zip(id_list, title_list, rates))
    df_res = pd.DataFrame(res)
    top3_id_list = df_res.sort_values(by=[2],ascending=False)[:3][0].tolist()

    return top3_id_list


def state2_response(type, question):
    response_video = {}
    response_guide = {}

    if type == "video":
        serch_func(response_video, question, "youtube", 5)
        return response_video

    elif type == "guide":
        # QA from db
        qa_list = QA.query.all()
        # response_list_guide.append(rank_matching_qa([qa.id for qa in qa_list], [qa.title for qa in qa_list], question))
        response_guide['ids'] = rank_matching_qa([qa.id for qa in qa_list], [qa.title for qa in qa_list], question)

        # gov
        serch_func(response_guide, question, "gov au", 3)
        # unsw
        serch_func(response_guide, question, "unsw au", 3)
        # org
        serch_func(response_guide, question, "org au", 3)     
        return response_guide


def state3_response(question):
    response_list_related = ["If your concerns are not addressed, here are some more related questions for you to click on."]
    params = {
        "api_key": "10f8b30bda3da92367f393ba85209c5de69a9eb33cb75a9396a47d0a35a81cf6",
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

    # return [f"{result['question']}: {result['link']}"  for result in results["related_questions"][:3]]
    return [f"{result['question']}"  for result in results["related_questions"][:3]]



# state 1 inserting into db
def state1_response(id, question):
    new_user_question = UserQuestion(
        question_description=question,
        user_id=id
    )
    db.session.add(new_user_question)
    db.session.commit()
    return {'message': 'User Question Stored'}


'''
Chatbot Controllers
'''

# step 1: video or guide
# if "video": return youtube video link
# if "guide": return 1-3 QA from db
#             return 1-3 external link from gov unsw org
# in the format of ["", "", ""]
def state_response(data):
    if data['state'] == 1:
        return state1_response(current_user.id, data['input_text'])

    question = UserQuestion.query.filter_by(user_id=current_user.id).order_by(UserQuestion.created_at.desc()).first_or_404().question_description

    if data['state'] == 2:
        return state2_response(data['input_text'], question)
    elif data['state'] == 3:
        return state3_response(question)

    









    