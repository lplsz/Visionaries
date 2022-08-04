from flask_jwt_extended import current_user
from wellbeing.QA.models import Category
from wellbeing.thread.models import Thread, Reply
from wellbeing.extensions import db
from sqlalchemy.sql import and_


def get_threads():
    return {'threads': [thread.serialized for thread in Thread.query.all()]}


def get_threads_by_user(user_id):
    return {'threads': [thread.serialized for thread in
                        Thread.query.filter(Thread.replies.any(Reply.user_id == user_id)).order_by(
                            Thread.updated_at.desc()).all()]}


def get_unread_threads():
    # Return all threads without replies that belongs to any of the users' interested categories
    category_ids = [category.id for category in current_user.interested_categories]
    return {'threads': [thread.serialized for thread in Thread.query.filter(
        and_(Thread.replies == None, Thread.category_id.in_(category_ids))
    ).order_by(Thread.updated_at.desc()).all()]}


def post_thread(data):
    new_thread = Thread(
        title=data['title'],
        body=data['body'],
        user_id=current_user.id,
    )
    new_thread.category = Category.query.filter_by(id=data['category_id']).first_or_404('Category Not Found')
    db.session.add(new_thread)
    db.session.commit()
    return {'thread': new_thread.serialized}


def put_thread(data):
    thread = Thread.query.filter_by(id=data['thread_id']).first_or_404('Thread Not Found')
    thread.title = data['title']
    thread.body = data['body']
    thread.category = Category.query.filter_by(id=data['category_id']).first_or_404('Category Not Found')
    thread.resolved = data['resolved']
    db.session.commit()
    return {'thread': thread.serialized}


'''
Reply Controllers
'''


def post_reply(data):
    print('before search')
    new_reply = Reply(
        body=data['body'],
        user_id=current_user.id,
        thread_id=Thread.query.filter_by(id=data['thread_id']).first_or_404('Thread Not Found').id
    )
    print('before commit')
    db.session.add(new_reply)
    db.session.commit()
    print('after commit')
    return {'reply': new_reply.serialized}


def put_reply(data):
    reply = Reply.query.filter_by(id=data['reply_id']).first_or_404('Reply Not Found')
    reply.body = data['body']
    db.session.commit()
    return {'reply': reply.serialized}
