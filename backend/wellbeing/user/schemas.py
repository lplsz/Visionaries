from apiflask import Schema
from apiflask.fields import String, Integer, Email, List, Nested, DateTime
from apiflask.validators import OneOf


class QualificationSchema(Schema):
    id = Integer(required=True, example=1)
    acquired_at = DateTime(required=True, example='2020-01-01T00:00:00')
    description = String(required=True, example='I love my country')


class UserSchema(Schema):
    id = Integer(required=True, example=1)
    username = String(required=True, example='Taylor Swift')
    email = Email(required=True, example='ts@gmail.com')
    account_type = String(required=True, validate=OneOf(['student', 'expert']), example='student')
    biograph = String(example='Hello, I am Taylor Swift')
    profile_image_src = String()

    languages = List(String())
    experiences = List(String())
    qualifications = List(Nested(QualificationSchema))


class GetUserOutSchema(Schema):
    user = Nested(UserSchema, required=True, partial=True)


class PutUserInSchema(Schema):
    username = String(required=True, example='Taylor Swift')
    email = Email(required=True, example='ts@gmail.com')
    biograph = String(example='Hello, I am Taylor Swift')
    profile_image_src = String()

    language_ids = List(Integer())
    experience_ids = List(Integer())
    qualifications = List(String())
