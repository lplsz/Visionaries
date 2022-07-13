from apiflask import Schema
from apiflask.fields import Integer, String, DateTime, Nested, List, Boolean

from wellbeing.user.schemas import UserSchema, CategorySchema

class ReplySchema(Schema):
    id = Integer(required=True, example=0)
    thread_id = Integer(required=True, example=0)
    body = String(required=True, example='Replies')
    created_at = DateTime(required=True, example='2020-01-01T00:00:00Z')
    username = String(required=True, example='Taylor Swift')
    
class ThreadSchema(Schema):
    id = Integer(required=True, example=0)
    title = String(required=True, example='Blank Space')
    body = String(required=True, example='Cherry lips, crystal skies')
    created_at = DateTime(required=True, example='2020-01-01T00:00:00Z')
    student = Nested(UserSchema, required=True, partial=True)
    category_name = String(required=True, example='Pop')
    reply = Nested(ReplySchema, require = True)
    resolved = Boolean(required = True, example = 'False')


class GetThreadOutSchema(Schema):
    thread = Nested(ThreadSchema, required=True)
    
