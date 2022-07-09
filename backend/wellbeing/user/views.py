from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required

from wellbeing.user.schemas import GetUserOutSchema, PutUserInSchema

blueprint = APIBlueprint('user', __name__)


@blueprint.route('/user_profile/<int:user_id>')
class UserProfile(MethodView):
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
