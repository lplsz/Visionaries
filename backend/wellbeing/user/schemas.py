from apiflask import Schema
from apiflask.fields import String, Integer, Email
from apiflask.validators import OneOf


class UserSchema(Schema):
    id = Integer(required=True, example=1)
    username = String(required=True, example='Taylor Swift')
    email = Email(required=True, example='ts@gmail.com')
    account_type = String(required=True, validate=OneOf(['student', 'expert']), example='student')
    biograph = String(example='Hello, I am Taylor Swift')
    profile_image = String()
