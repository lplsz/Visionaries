from apiflask import APIBlueprint
from flask.views import MethodView

blueprint = APIBlueprint('qa', __name__)


@blueprint.route('/qa/<int:qa_id>')
class QA(MethodView):

    def get(self, qa_id):
        pass
