from apiflask import Schema
from apiflask.fields import Integer, String, DateTime, Nested, List

from wellbeing.user.schemas import UserSchema


class CategorySchema(Schema):
    id = Integer(required=True, example=0)
    category_name = String(required=True, example='Pop')
    category_image_url = String(required=True)
    creator_id = Integer(required=True, example=0)


class QASchema(Schema):
    id = Integer(required=True, example=0)
    title = String(required=True, example='Blank Space')
    body = String(required=True, example='Cherry lips, crystal skies')
    created_at = DateTime(required=True, example='2020-01-01T00:00:00Z')
    reviewed_at = DateTime(required=True, example='2020-01-01T00:00:00Z')
    author = Nested(UserSchema, required=True)
    category = Nested(CategorySchema, required=True)


class GetQAsInSchema(Schema):
    category_ids = List(Integer(), example=[0, 1])
    tag_ids = List(Integer(), example=[2, 3])
    keyword = String(example='Love Story')


class GetQAsOutSchema(Schema):
    qas = List(Nested(QASchema), required=True)


class GetQAOutSchema(Schema):
    qa = Nested(QASchema, required=True)


class PostQAInSchema(Schema):
    category_id = Integer(required=True, example=0)
    tag_ids = List(Integer, example=[2, 3])
    title = String(required=True, example='Blank Space')
    body = String(required=True, example='Cherry lips, crystal skies')
    author_id = Integer(required=True, example=0)
