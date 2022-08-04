from apiflask import Schema
from apiflask.fields import String, Integer, Email, List, Nested, DateTime
from apiflask.validators import OneOf

# class ChatbotSchema_2(Schema):
#     # id = Integer(required=True, example=1)
#     # state = Integer(required=True, example=1)
#     question_description = String(required=True, example='Where can I get covid vaccine?')
#     response_type = String(required=True, example='video')


# class ChatbotSchema_3(Schema):
#     question_description = String(required=True, example='Where can I get covid vaccine?')

class ChatbotSchema(Schema):
    state = Integer(required=True, example=1)
    input_text = String(required=True, example='Where can I get covid vaccine?')
