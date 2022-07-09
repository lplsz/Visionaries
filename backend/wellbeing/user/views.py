from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required

from wellbeing.user.schemas import GetUserOutSchema, PutUserInSchema, PutQualificationInSchema, \
    DeleteQualificationInSchema

import wellbeing.user.controllers as controllers

blueprint = APIBlueprint('user', __name__)


@blueprint.route('/user_profile/<int:user_id>')
class UserProfileByID(MethodView):
    @blueprint.output(GetUserOutSchema, 200)
    @blueprint.doc(
        summary='Get User profile by ID',
        description='Get User profile by ID',
        responses={
            404: 'User Not Found',
        }
    )
    def get(self, user_id):
        pass


@blueprint.route('/user_profile')
class UserProfile(MethodView):
    @blueprint.output(GetUserOutSchema, 200)
    @blueprint.doc(
        summary='Get current user profile',
        description='Get current user profile',
        responses={
            404: 'User Not Found',
        }
    )
    def get(self):
        pass

    @blueprint.input(PutUserInSchema)
    @blueprint.doc(
        security='JWT Bearer Token',
        summary='Update User profile',
        description='Update User profile',
        responses={
            200: 'User profile Updated',
            404: 'User Not Found',
        })
    @jwt_required()
    def put(self, user_id):
        pass


@blueprint.route('/qualification')
class Qualification(MethodView):
    @blueprint.input(PutQualificationInSchema)
    @blueprint.doc(
        security='JWT Bearer Token',
        summary='Update user qualification',
        description='Update user qualification',
        responses={
            200: 'User qualification Updated',
            403: 'Forbidden',
            404: 'User Not Found',
        })
    @jwt_required()
    def put(self, data):
        pass

    @blueprint.input(DeleteQualificationInSchema)
    @blueprint.doc(
        security='JWT Bearer Token',
        summary='Delete a qualification',
        description='Delete a qualification',
        responses={
            200: 'Qualification Deleted',
            403: 'Forbidden',
            404: 'Qualification Not Found',
        })
    @jwt_required()
    def delete(self, data):
        return controllers.delete_qualification_by_id(data['qualification_id'])
