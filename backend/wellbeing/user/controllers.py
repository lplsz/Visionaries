from flask_jwt_extended import current_user
from sqlalchemy.sql import and_

from wellbeing.user.models import User, Language, Qualification
from wellbeing.extensions import db

'''
User Controllers
'''


def get_all_languages():
    return {'languages': Language.query.all()}

