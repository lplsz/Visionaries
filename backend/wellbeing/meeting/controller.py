from wellbeing.utility.google_meeting import create_meeting
from wellbeing.meeting.models import TimeRange, Availability
from datetime import datetime


def get_availabilities(expert_id):
    """
    Returns a list of availabilities for a user.
    """
    availabilities = Availability.query.filter_by(expert_id=expert_id).all()
    return {"availabilities": [availability.serialized for availability in availabilities]}


def set_availability(expert_id, availabilities):
    """
    Sets the availability for a user. availabilities is a list of dictionaries
    with the keys 'date', 'time_range_id', 'status' and optional keys 'student_id' and 'meeting_metadata'.
    Upsert if primary key exists.
    """
    for availability in availabilities:
        availability_db = Availability.query.filter_by(expert_id=expert_id, date=availability['date'],
                                                       time_range_id=availability['time_range_id']).first()
        if availability_db is None:
            availability_db = Availability(**availability)
            db.session.add(availability_db)
        else:
            availability_db.status = availability['status']
            availability_db.student_id = availability.get('student_id', None)
            availability_db.meeting_metadata = availability.get('meeting_metadata', None)

    db.session.commit()
    return get_availabilities(expert_id)


def make_booking(expert_id, student_id, date, time_range_id):
    """
    Makes a booking with expert and student's email. Sets the status of the availability to 'booked'.
    """
    availability = Availability.query.filter_by(expert_id=expert_id, date=date, time_range_id=time_range_id).first()
    availability.status = 'booked'
    availability.student_id = student_id

    student = User.query.filter_by(id=student_id).first_or_404('Student not found')
    expert = User.query.filter_by(id=expert_id).first_or_404('Expert not found')

    time_range: TimeRange = TimeRange.query.filter_by(id=time_range_id).first_or_404('Time range not found')

    start_at = datetime.combine(date, time_range.start_at)
    end_at = datetime.combine(date, time_range.end_at)
    print(start_at, end_at)

    availability.meeting_metadata = create_meeting(expert.email, student.email,
                                                   datetime.combine(date, time_range.start_at),
                                                   datetime.combine(date, time_range.end_at))

    return get_availabilities(expert_id)
