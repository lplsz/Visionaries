from wellbeing.extensions import db
from sqlalchemy.sql import func
from datetime import datetime


class Thread(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    resolved = db.Column(db.Boolean, default=False, nullable=False)

    # Relationships
    category = db.relationship('Category', lazy=False, uselist=False, back_populates='threads')
    replies = db.relationship('Reply', lazy=False, uselist=True, back_populates='thread')
    user = db.relationship('User', lazy=False, uselist=False, back_populates='threads')


class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    thread = db.relationship('Thread', lazy=False, uselist=False, back_populates='replies')
    user = db.relationship('User', lazy=False, uselist=False, back_populates='replies')
