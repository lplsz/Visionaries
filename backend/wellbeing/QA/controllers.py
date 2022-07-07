from flask_jwt_extended import current_user
from sqlalchemy.sql import and_

from wellbeing.QA.models import QA, Tag, Category
from wellbeing.extensions import db

'''
QA Controllers
'''


def post_qa(data):
    new_qa = QA(
        title=data['title'],
        body=data['body'],
        author_id=current_user.id,
    )
    new_qa.category = Category.query.filter_by(id=data['category_id']).first_or_404()
    new_qa.tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all

    db.session.add(new_qa)
    db.session.commit()
    return {'message': 'QA Posted'}


def get_qa_by_id(qa_id):
    return QA.query.filter_by(id=qa_id).first_or_404()


def delete_qa_by_id(qa_id):
    db.session.delete(QA.query.filter_by(id=qa_id).first_or_404(description='QA Not Found'))
    db.session.commit()
    return {'message': 'QA Deleted'}


def put_qa_by_id(qa_id, data):
    qa = QA.query.filter_by(id=qa_id).first_or_404()
    qa.title = data['title']
    qa.body = data['body']
    qa.author_id = data['author_id']
    qa.category = Category.query.filter_by(id=data['category_id']).first_or_404()
    qa.tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()
    db.session.commit()
    return {'message': 'QA Updated'}


def get_qas(data):
    conditions = []
    if 'category_ids' in data:
        conditions.append(QA.category_id.in_(data['category_ids']))
    if 'tag_ids' in data:
        conditions.append(QA.tags.any(Tag.id.in_(data['tag_ids'])))
    if 'keyword' in data:
        conditions.append(QA.title.like('%' + data['keyword'] + '%'))

    qas = QA.query.filter(and_(*conditions)).all()
    return {'qas': qas}


'''
Tag Controllers
'''


def get_tags():
    return {'tags': Tag.query.all()}


def post_tag(data):
    new_tag = Tag(
        tag_name=data['tag_name']
    )
    db.session.add(new_tag)
    db.session.commit()
    return {'message': 'Tag Created'}


def delete_tag_by_id(tag_id):
    db.session.delete(Tag.query.filter_by(id=tag_id).first_or_404(description='Tag Not Found'))
    db.session.commit()
    return {'message': 'Tag Deleted'}


def put_tag_by_id(tag_id, data):
    tag = Tag.query.filter_by(id=tag_id).first_or_404(description='Tag Not Found')
    tag.tag_name = data['tag_name']
    db.session.commit()
    return {'message': 'Tag Updated'}
