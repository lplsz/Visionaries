from sqlalchemy.sql import func
from datetime import datetime

from wellbeing.extensions import db


class QATag(db.Model):
    __tablename__ = "qa_tag"
    qa_id = db.Column(db.Integer, db.ForeignKey("qa.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tag.id"), primary_key=True)


class QA(db.Model):
    __tablename__ = 'qa'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    review_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    # Relationships
    category = db.relationship('Category', lazy=False, uselist=False, back_populates='qas')
    author = db.relationship('User', lazy=False, uselist=False, back_populates='qas')
    tags = db.relationship('Tag', lazy=False, uselist=True, back_populates='qas', secondary="qa_tag")


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.Text, nullable=False)

    # Relationships
    qas = db.relationship('QA', lazy=False, uselist=True, back_populates='tags', secondary="qa_tag")


class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.Text, nullable=False)
    category_image_src = db.Column(db.Text, nullable=True)
    category_description = db.Column(db.Text, nullable=True)

    # Relationships
    threads = db.relationship('Thread', lazy=False, uselist=True, back_populates='category')
    qas = db.relationship('QA', lazy=False, uselist=True, back_populates='category')

    # interested_users = db.relationship('User', lazy=False, uselist=True, back_populates='interested_categories',

    def __repr__(self):
        return f'<Category {self.category_name}>'

    @property
    def serialized(self):
        return {
            'id': self.id,
            'category_name': self.category_name,
            'category_image_src': self.category_image_src,
            'category_description': self.category_description,
        }
