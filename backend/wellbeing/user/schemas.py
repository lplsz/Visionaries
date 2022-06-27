from apiflask import Schema
from apiflask.fields import String, Integer, Email, OneOf


class UserSchema(Schema):
    id = Integer(required=True)
    username = String(required=True)
    email = Email(required=True)
    account_type = String(required=True, validate=OneOf(['student', 'expert']))
    biograph = String()
    profile_image = String()
