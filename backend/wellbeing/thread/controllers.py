from flask_jwt_extended import current_user
from wellbeing.QA.models import Category
from wellbeing.thread.models import Thread, Reply
from wellbeing.extensions import db


def get_threads():
    return {'threads': Thread.query.all()}


def post_thread(data):
    new_thread = Thread(
        title=data['title'],
        body=data['body'],
        user_id=current_user.id,
    )
    new_thread.category = Category.query.filter_by(id=data['category_id']).first_or_404('Category Not Found')
    db.session.add(new_thread)
    db.session.commit()
    return {'thread': new_thread}


def put_thread(data):
    thread = Thread.query.filter_by(id=data['thread_id']).first_or_404('Thread Not Found')
    thread.title = data['title']
    thread.body = data['body']
    thread.category = Category.query.filter_by(id=data['category_id']).first_or_404('Category Not Found')
    thread.resolved = data['resolved']
    db.session.commit()
    return {'thread': thread}


'''
Reply Controllers
'''


def post_reply(data):
    new_reply = Reply(
        body=data['body'],
        user_id=current_user.id,
    )
    new_reply.thread = Thread.query.filter_by(id=data['thread_id']).first_or_404('Thread Not Found')
    db.session.add(new_reply)
    db.session.commit()
    return {'reply': new_reply}


def put_reply(data):
    reply = Reply.query.filter_by(id=data['reply_id']).first_or_404('Reply Not Found')
    reply.body = data['body']
    db.session.commit()
    return {'reply': reply}
