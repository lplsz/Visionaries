from app.extensions import db

qa_tags = db.Table(
    "qa_tags",
    db.Column("qa_id", db.ForeignKey("qa.id"), primary_key=True),
    db.Column("tag_id", db.ForeignKey("tag.id"), primary_key=True),
)


class QA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    review_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    # Relationships
    category = db.relationship('Category', lazy=False, useList=False, back_populates='qas')
    user = db.relationship('User', lazy=False, useList=False, back_populates='threads')
    tags = db.relationship('Tag', lazy=False, useList=True, back_populates='qas', secondary=qa_tags)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.Text, nullable=False)

    # Relationships
    qas = db.relationship('QA', lazy=False, useList=True, back_populates='tags', secondary=qa_tags)
