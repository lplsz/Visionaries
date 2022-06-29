from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required

from wellbeing.QA.schemas import (GetTagsOutSchema, GetCategoriesOutSchema, GetQAsInSchema, GetQAsOutSchema, \
                                  GetQAOutSchema, PostQAInSchema, PostTagInSchema, PutTagInSchema, PutQAInSchema)

qa_blueprint = APIBlueprint('QA', __name__)


@qa_blueprint.route('/qa')
class QA(MethodView):
    @qa_blueprint.input(PostQAInSchema)
    @qa_blueprint.doc(
        security='JWT Bearer Token',
        summary='Post a new QA',
        description='Post a new QA',
        responses={
            200: 'QA Posted',
        }
    )
    @jwt_required()
    def post(self, data):
        pass


@qa_blueprint.route('/qa/<int:qa_id>')
class QAByID(MethodView):

    @qa_blueprint.output(GetQAOutSchema, 200)
    @qa_blueprint.doc(
        summary='Get QA by ID',
        description='Get QA by ID',
        responses={
            404: 'QA Not Found',
        }
    )
    def get(self, qa_id):
        pass

    @qa_blueprint.doc(
        security='JWT Bearer Token',
        summary='Delete QA',
        description='Delete QA',
        responses={
            200: 'QA Deleted',
            404: 'QA Not Found',
        }
    )
    @jwt_required()
    def delete(self, qa_id, data):
        pass

    @qa_blueprint.input(PostQAInSchema)
    @qa_blueprint.doc(
        security='JWT Bearer Token',
        summary='Update QA',
        description='Update QA',
        responses={
            200: 'QA Updated',
            404: 'QA Not Found',
        }
    )
    @jwt_required()
    def put(self, qa_id, data):
        pass


@qa_blueprint.route('/qas')
class QAs(MethodView):

    @qa_blueprint.input(GetQAsInSchema, location='query')
    @qa_blueprint.output(GetQAsOutSchema, 200)
    @qa_blueprint.doc(
        summary='Get list of QA by filters',
        description='Get QAs by category or tags or keyword',
        responses={
            404: 'Not Found',
        }
    )
    def get(self, data):
        pass


'''
Tag APIs
'''

tag_blueprint = APIBlueprint('tag', __name__)


@tag_blueprint.route('/tags')
class Tags(MethodView):
    @tag_blueprint.output(GetTagsOutSchema, 200)
    @tag_blueprint.doc(
        summary='Get all tags',
        description='Get all tags',
    )
    def get(self):
        pass


@tag_blueprint.route('/tag')
class Tag(MethodView):
    @tag_blueprint.input(PostTagInSchema)
    @tag_blueprint.doc(
        security='JWT Bearer Token',
        summary='Create new tag',
        description='Create new tag',
        responses={
            200: 'Tag Created',
        }
    )
    @jwt_required()
    def post(self):
        pass


@tag_blueprint.route('/tag/<int:tag_id>')
class TagById(MethodView):
    @tag_blueprint.doc(
        security='JWT Bearer Token',
        summary='Delete tag',
        description='Delete tag',
        responses={
            200: 'Tag Deleted',
            404: 'Tag Not Found',
        },
    )
    @jwt_required()
    def delete(self, tag_id):
        pass

    @tag_blueprint.input(PutTagInSchema)
    @tag_blueprint.doc(
        security='JWT Bearer Token',
        summary='Update tag',
        description='Update tag',
        responses={
            200: 'Tag Updated',
            404: 'Tag Not Found',
        }
    )
    @jwt_required()
    def put(self, tag_id):
        pass


'''
Category APIs
'''

category_blueprint = APIBlueprint('category', __name__)


@category_blueprint.route('/categories')
class Categories(MethodView):
    @category_blueprint.output(GetCategoriesOutSchema, 200)
    @category_blueprint.doc(
        summary='Get all categories',
        description='Get all categories',
    )
    def get(self):
        pass


@category_blueprint.route('/category')
class Category(MethodView):
    @category_blueprint.input(PostTagInSchema)
    @category_blueprint.doc(
        security='JWT Bearer Token',
        summary='Create new category',
        description='Create new category',
        responses={
            200: 'Category Created',
        })
    def post(self):
        pass


@category_blueprint.route('/category/<int:category_id>')
class CategoryById(MethodView):
    @category_blueprint.doc(
        security='JWT Bearer Token',
        summary='Delete category',
        description='Delete category',
        responses={
            200: 'Category Deleted',
            404: 'Category Not Found',
        },
    )
    @jwt_required()
    def delete(self, category_id):
        pass

    @category_blueprint.input(PutQAInSchema)
    @category_blueprint.doc(
        security='JWT Bearer Token',
        summary='Update category',
        description='Update category',
        responses={
            200: 'Category Updated',
            404: 'Category Not Found',
        }
    )
    @jwt_required()
    def put(self, category_id):
        pass
