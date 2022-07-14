from flask_jwt_extended import current_user
from sqlalchemy.sql import and_ #,in_

from wellbeing.user.models import User, Language, Qualification
from wellbeing.QA.models import Category
from wellbeing.extensions import db
from wellbeing.user.schemas import UserSchema

'''
User Controllers
'''


def get_all_languages():
    return {'languages': Language.query.all()}


def get_profile_by_id(user_id):
    return {'user': User.query.filter_by(id=user_id).first_or_404()}


def put_current_user_profile(data):
    user = User.query.filter_by(id=current_user.id).first_or_404()
    user.username = data['username']
    user.set_password(data['password'])
    user.biography = data['biography']
    user.profile_image_src = data['profile_image_src']
    user.languages = Language.query.filter(Language.id.in_(data['language_ids'])).all()
    user.interested_categories = Category.query.filter(Category.id.in_(data['category_ids'])).all()
    # TODO: Experience
    user.experiences = Experience.query.filter(Experience.id.in_(data['experience_ids'])).all()
    db.session.commit()
    return {'message': 'User Profile Updated'}
