from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required, current_user

from wellbeing.chatbot.schemas import (
    ChatbotSchema_2,
    ChatbotSchema_3,
    ChatbotSchema
)

import wellbeing.chatbot.controllers as controllers

blueprint = APIBlueprint('chatbot', __name__)

# @blueprint.route('/chatbot_state2')
# class State2Response_Video_Guide(MethodView):
#     @blueprint.input(ChatbotSchema_2)
#     # @blueprint.doc(
#     #     security='JWT Bearer Token',
#     #     summary='Update User profile',
#     #     description='Update User profile',
#     #     responses={
#     #         200: 'User profile Updated',
#     #         404: 'User Not Found',
#     #     })
#     # @jwt_required()
#     def post(self, data):
#         return controllers.state2_response(data)

# @blueprint.route('/chatbot_state3')
# class State3Response_RelatedQuestion(MethodView):
#     @blueprint.input(ChatbotSchema_3)
#     # @blueprint.doc(
#     #     security='JWT Bearer Token',
#     #     summary='Update User profile',
#     #     description='Update User profile',
#     #     responses={
#     #         200: 'User profile Updated',
#     #         404: 'User Not Found',
#     #     })
#     # @jwt_required()
#     def post(self, data):
#         return controllers.state3_response(data)

@blueprint.route('/chatbot')
class ChatbotResponse(MethodView):
    @blueprint.input(ChatbotSchema)
    @blueprint.doc(
        security='JWT Bearer Token',
        summary='Update User profile',
        description='Update User profile',
        responses={
            200: 'User profile Updated',
            404: 'User Not Found',
        })
    @jwt_required()
    def post(self, data):
        return controllers.state_response(data)