from apiflask import APIBlueprint
from flask.views import MethodView

from wellbeing.QA.schemas import GetQAsInSchema, GetQAOutSchema, PostQAInSchema

blueprint = APIBlueprint('qa', __name__)


@blueprint.route('/qa/<int:qa_id>')
class QA(MethodView):

    @blueprint.output(GetQAOutSchema, 200)
    def get(self, qa_id):
        pass

    @blueprint.input(PostQAInSchema)
    @blueprint.doc(
        security='JWT Bearer Token',
        description='Post new QA',
        responses={
            200: 'QA Posted',
        }
    )
    def post(self):
        pass


@blueprint.route('/qas')
class QAs(MethodView):

    @blueprint.input(GetQAsInSchema, location='query')
    def get(self, data):
        pass
