from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required
import wellbeing.thread.controllers as controllers
from wellbeing.thread.schemas import (
    PostThreadInSchema,
    PostThreadOutSchema,
    GetThreadsOutSchema,
    PutThreadInSchema,
    PostReplyInSchema,
    PostReplyOutSchema,
    PutReplyInSchema,
)

thread_blueprint = APIBlueprint('thread', __name__)

'''
Thread Endpoints
'''


@thread_blueprint.route('/threads_by_user/<int:user_id>')
class ThreadsByUser(MethodView):
    @thread_blueprint.output(GetThreadsOutSchema, 200)
    @thread_blueprint.doc(
        responses={200: 'OK', 404: 'User Not Found'},
    )
    def get(self, user_id):
        return controllers.get_threads_by_user(user_id)


@thread_blueprint.route('/threads')
class Threads(MethodView):
    @thread_blueprint.output(GetThreadsOutSchema, 200)
    @thread_blueprint.doc(
        summary='Get Threads',
        description='Get Threads',
    )
    def get(self):
        return controllers.get_threads()


@thread_blueprint.route('/thread')
class Thread(MethodView):
    @thread_blueprint.input(PostThreadInSchema)
    @thread_blueprint.output(PostThreadOutSchema, 200)
    @thread_blueprint.doc(
        security='JWT Bearer Token',
        summary='Post a new thread',
        description='Post a new thread',
        responses={
            200: 'Thread Posted',
        }
    )
    @jwt_required()
    def post(self, data):
        return controllers.post_thread(data)

    @thread_blueprint.input(PutThreadInSchema)
    @thread_blueprint.output(PostThreadOutSchema, 200)
    @thread_blueprint.doc(
        security='JWT Bearer Token',
        summary='Update thread',
        description='Update thread',
        responses={
            404: 'Thread not found'
        }
    )
    @jwt_required()
    def put(self, data):
        return controllers.put_thread(data)


'''
Reply Endpoints
'''


@thread_blueprint.route('/reply')
class Reply(MethodView):
    @thread_blueprint.input(PostReplyInSchema)
    @thread_blueprint.output(PostReplyOutSchema, 200)
    @thread_blueprint.doc(
        security='JWT Bearer Token',
        summary='Post a new reply',
        description='Post a new reply',
        responses={
            200: 'Reply Posted',
            404: 'Thread not found'
        })
    @jwt_required()
    def post(self, data):
        return controllers.post_reply(data)

    @thread_blueprint.input(PutReplyInSchema)
    @thread_blueprint.output(PostReplyOutSchema, 200)
    @thread_blueprint.doc(
        security='JWT Bearer Token',
        summary='Update reply',
        description='Update reply',
        responses={
            404: 'Reply not found'
        }
    )
    @jwt_required()
    def put(self, data):
        return controllers.put_reply(data)
