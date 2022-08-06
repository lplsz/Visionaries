from wellbeing.utility.google_meeting import create_meeting
from wellbeing.user.models import User
from wellbeing.meeting.models import TimeRange, Availability
from wellbeing.extensions import db
from datetime import datetime
from apiflask import abort


def get_expert_availabilities(expert_id):
    """
    Returns a list of availabilities for a user.
    """
    availabilities = Availability.query.filter_by(expert_id=expert_id).all()
    return {"availabilities": [availability.serialized for availability in availabilities]}


def get_student_availabilities(student_id):
    """
    Returns a list of availabilities for a user.
    """
    availabilities = Availability.query.filter_by(student_id=student_id).all()
    return {"availabilities": [availability.serialized for availability in availabilities]}


def update_expert_availability(data):
    """
    Updates the availability of a user.
    """
    return update_availabilities(data['expert_id'], [data])


def update_expert_availabilities(expert_id, availabilities):
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

    # Create availability if it doesn't exist
    try:
        availability_db = Availability.query.filter_by(expert_id=expert_id, date=date,
                                                       time_range_id=time_range_id).first()
        if not availability_db:
            availability = Availability(expert_id=expert_id, student_id=student_id, date=date,
                                        time_range_id=time_range_id, status='available')
        else:
            availability = availability_db

        # Check if the availability is available
        if availability.status != 'available':
            abort(409, f'The expert is {availability.status}')

        # Make the booking
        availability.status = 'booked'
        availability.student_id = student_id

        student = User.query.filter_by(id=student_id).first_or_404('Student not found')
        expert = User.query.filter_by(id=expert_id).first_or_404('Expert not found')

        time_range: TimeRange = TimeRange.query.filter_by(id=time_range_id).first_or_404('Time range not found')
        availability.meeting_metadata = create_meeting(expert.email, student.email,
                                                       datetime.combine(date, time_range.start_at),
                                                       datetime.combine(date, time_range.end_at))
        if not availability_db:
            db.session.add(availability)
        db.session.commit()

        return {'meeting': availability.serialized}

    except Exception as e:
        print(e)
        db.session.rollback()
        raise e
