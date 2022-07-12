from flask_jwt_extended import current_user
from sqlalchemy.sql import and_

from wellbeing.user.models import User, Language, Qualification
from wellbeing.extensions import db
from wellbeing.user.schemas import UserSchema

'''
User Controllers
'''


def get_all_languages():
    return {'languages': Language.query.all()}

def get_profile_by_id(user_id):
   return User.query.filter_by(id=user_id).first_or_404()

def get_current_user_profile():
    return User.query.filter_by(id=current_user.user_id).first_or_404()