from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from wellbeing.thread.schemas import (GetThreadOutSchema)
import wellbeing.thread.controllers as controllers

thread_blueprint = APIBlueprint('thread', __name__)

@thread_blueprint.route('/thread/<int:qa_id>')
class ThreadByID(MethodView):

    @thread_blueprint.output(GetThreadOutSchema, 200)
    @thread_blueprint.doc(
        summary='Get Thread by ID',
        description='Get Thread by ID',
        responses={
            404: 'Thread Not Found',
        }
    )
    def get(self, thread_id):
        return controllers.get_thread_by_id(thread_id)