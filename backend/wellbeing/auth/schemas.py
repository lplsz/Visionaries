from apiflask import Schema
from apiflask.fields import String, Nested

from wellbeing.user.schemas import UserSchema


class RegisterInSchema(Schema):
    username = String(required=True, example='Taylor Swift')
    email = String(required=True, example='ts@gmail.com')
    password = String(required=True, example='password')


class RegisterOutSchema(Schema):
    access_token = String(required=True)
    user = Nested(UserSchema, required=True)


class LoginInSchema(Schema):
    email = String(required=True, example='ts@gmail.com')
    password = String(required=True, example='password')


class LoginOutSchema(Schema):
    access_token = String(required=True)
    user = Nested(UserSchema, required=True)


class LogoutInSchema(Schema):
    access_token = String(required=True)
