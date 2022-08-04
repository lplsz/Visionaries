from wellbeing.extensions import db

class User_Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_description = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, uselist=False, back_populates='user_questions')
