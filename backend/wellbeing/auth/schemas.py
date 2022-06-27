from apiflask import Schema
from apiflask.fields import String, Nested

from wellbeing.user.schemas import UserSchema


class RegisterInSchema(Schema):
    username = String(required=True)
    email = String(required=True)
    password = String(required=True)


class RegisterOutSchema(Schema):
    access_token = String(required=True)
    user = Nested(UserSchema, required=True)


class LoginInSchema(Schema):
    email = String(required=True)
    password = String(required=True)


class LoginOutSchema(Schema):
    access_token = String(required=True)
    user = Nested(UserSchema, required=True)