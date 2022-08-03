from flask_jwt_extended import current_user
from sqlalchemy.sql import and_
from serpapi import GoogleSearch

# from wellbeing.user.models import User, Language, Qualification
# from wellbeing.QA.models import Category
from wellbeing.extensions import db
# from wellbeing.chatbot.schemas import UserSchema

'''
Chatbot Controllers
'''

# step 1: 判断video or guide
# if "video": return youtube video link
# if "guide": return 1-3 QA from db
#             return 1-3 external link from gov unsw org
# in the format of ["", "", ""]
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

    for msg in range(num):
        response.append(results["organic_results"][msg]["title"]+ ": " + results["organic_results"][msg]["link"])
    return response


def state2_response(data):
    response_list_video = ["Sure, here are some video links related to your questions: "]
    response_list_guide = ["To answer your question: " + data['question_description'] + ", here are some helpful guide that we found for you: "]
    if data['response_type'] == "video":
        serch_func(response_list_video, data['question_description'], "youtube", 5)
        return response_list_video

    elif data['response_type'] == "guide":
        # gov
        serch_func(response_list_guide, data['question_description'], "gov au", 3)
        # unsw
        serch_func(response_list_guide, data['question_description'], "unsw au", 3)
        # org
        serch_func(response_list_guide, data['question_description'], "org au", 3)     
        return response_list_guide


def state3_response(data):
    response_list_related = ["If your concerns are not addressed, here are some more related questions for you to click on."]
    params = {
        "api_key": "10f8b30bda3da92367f393ba85209c5de69a9eb33cb75a9396a47d0a35a81cf6",
        "engine": "google",
        "q": data['question_description'],
        "google_domain": "google.com",
        "hl": "en",
        "num":10
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    for msg in range(3):
        response_list_related.append(results["related_questions"][msg]["question"]+ ": " + results["related_questions"][msg]["link"])
    return response_list_related






    