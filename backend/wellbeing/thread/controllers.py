from flask_jwt_extended import current_user
from sqlalchemy.sql import and_

from wellbeing.thread.models import Thread, Reply
from wellbeing.extensions import db


def get_thread_by_id(thread_id):
    return Thread.query.filter_by(id=thread_id).first_or_404()