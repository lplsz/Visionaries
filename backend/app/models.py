from app.extensions import db


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.Text, nullable=False)

    # Relationships
    threads = db.relationship('Thread', lazy=False, useList=True, back_populates='category')
    qas = db.relationship('QA', lazy=False, useList=True, back_populates='category')
