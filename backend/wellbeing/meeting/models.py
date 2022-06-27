from app.extensions import db


class AvailableTimeRange(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_at = db.Column(db.Time, nullable=False)
    end_at = db.Column(db.Time, nullable=False)
    week_day = db.Column(db.Integer, nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, useList=False, back_populates='available_time_ranges')


class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    expert_id = db.Column(db.Integer, db.ForeignKey('used.id'), nullable=False)
    start_at = db.Column(db.DateTime, nullable=False)
    end_at = db.Column(db.DateTime, nullable=False)
    metadata = db.Column(db.Text, nullable=False)

    # Relationships
    user = db.relationship('User', foreign_keys=[user_id], lazy=False, useList=False, back_populates='meetings_as_user')
    expert = db.relationship('User', foreign_keys=[expert_id], lazy=False, useList=False,
                             back_populates='meetings_as_expert')
