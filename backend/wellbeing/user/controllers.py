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
    return User.query.filter_by(id=current_user.id).first_or_404()


def put_current_user_profile(data):
    user = User.query.filter_by(id=current_user.id).first_or_404()
    user.username = data['username']
    # assume that user email cannot be changed
    # can password be chanegd here?
    user.biography = data['biography']
    user.profile_image_src = data['profile_image_src']
    user.languages = Language.query.filter_by(id=data['language_id']).first_or_404()
    user.interested_categories = Category.query.filter_by(id=data['category_id']).first_or_404()
    db.session.commit()
    return {'message': 'User Profile Updated'}