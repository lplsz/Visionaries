from sqlalchemy.sql import func

from wellbeing.extensions import db

qa_tag = db.Table(
    "qa_tag",
    db.Column("qa_id", db.ForeignKey("qa.id"), primary_key=True),
    db.Column("tag_id", db.ForeignKey("tag.id"), primary_key=True),
)


class QA(db.Model):
    __tablename__ = 'qa'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    review_at = db.Column(db.DateTime, nullable=False, onupdate=func.now())
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    # Relationships
    category = db.relationship('Category', lazy=False, uselist=False, back_populates='qas')
    author = db.relationship('User', lazy=False, uselist=False, back_populates='qas')
    tags = db.relationship('Tag', lazy=False, uselist=True, back_populates='qas', secondary=qa_tag)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.Text, nullable=False)

    # Relationships
    qas = db.relationship('QA', lazy=False, uselist=True, back_populates='tags', secondary=qa_tag)


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
    #                                    secondary=user_category)
