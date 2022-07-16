from wellbeing.extensions import db


# class AvailableTimeRange(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     start_at = db.Column(db.Time, nullable=False)
#     end_at = db.Column(db.Time, nullable=False)
#     week_day = db.Column(db.Integer, nullable=False)
#
#     # Relationships
#     user = db.relationship('User', lazy=False, uselist=False, back_populates='available_time_ranges')
#
#
# class Meeting(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     expert_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     start_at = db.Column(db.DateTime, nullable=False)
#     end_at = db.Column(db.DateTime, nullable=False)
#     meeting_metadata = db.Column(db.Text, nullable=False)
#
#     # Relationships
#     user = db.relationship('User', foreign_keys=[user_id], lazy=False, uselist=False, backref='meetings_as_user')
#     expert = db.relationship('User', foreign_keys=[expert_id], lazy=False, uselist=False,
#                              backref='meetings_as_expert')

class Availability(db.Model):
    """
    expert_id, time_range_id, date forms the Primary Key
    """
    expert_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    time_range_id = db.Column(db.Integer, db.ForeignKey('time_range.id'), primary_key=True)
    date = db.Column(db.Date, primary_key=True)
    status = db.Column(db.Enum('available', 'unavailable', 'booked'), nullable=False)

    # Not null only if status == 'booked'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    meeting_metadata = db.Column(db.Text, nullable=True)

    # Relationships
    user = db.relationship('User', foreign_keys=[user_id], lazy=False, uselist=False,
                           back_populates='availability_as_user')
    expert = db.relationship('User', foreign_keys=[expert_id], lazy=False, uselist=False,
                             back_populates='availability_as_expert')
    time_range = db.relationship('TimeRange', lazy=False, uselist=False, back_populates='availabilities')


class TimeRange(db.Model):
    __tablename__ = 'time_range'
    id = db.Column(db.Integer, primary_key=True)
    start_at = db.Column(db.Time, nullable=False)
    end_at = db.Column(db.Time, nullable=False)

    availabilities = db.relationship('Availability', lazy=True, uselist=True, back_populates='time_range')
