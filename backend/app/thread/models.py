from app.extensions import db


class Thread(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    resolved = db.Column(db.Boolean, default=False, nullable=False)

    # Relationships
    category = db.relationship('Category', lazy=False, useList=False, back_populates='threads')
    replies = db.relationship('Reply', lazy=False, useList=True, back_populates='thread')
    user = db.relationship('User', lazy=False, useList=False, back_populates='threads')


class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    # Relationships
    thread = db.relationship('Thread', lazy=False, useList=False, back_populates='replies')
    user = db.relationship('User', lazy=False, useList=False, back_populates='replies')
