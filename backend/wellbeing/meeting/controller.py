from datetime import datetime, timedelta

from apiflask import abort
from sqlalchemy.sql import and_

from wellbeing.QA.models import Category
from wellbeing.extensions import db
from wellbeing.meeting.models import TimeRange, Availability
from wellbeing.user.models import User
from wellbeing.utility.google_meeting import create_meeting


def get_expert_availabilities_by_date(expert_id, date):
    """
    Return the expert's availabilities on 'date' ordered by time_range_id.
    """
    availabilities = Availability.query.filter_by(expert_id=expert_id, date=date).order_by(
        Availability.time_range_id).all()
    print('after search')
    return {"availabilities": [availability.serialized for availability in availabilities]}


def get_expert_availabilities_by_week(expert_id, date):
    """
    Return the expert's availabilities of the week containing the 'date' ordered by date, time_range_id
    """

    # Get the start and end of the week containing date
    start_date = date - timedelta(days=date.weekday())
    end_date = start_date + timedelta(days=6)

    # Return the expert's availabilities with date between start_date and end_date ordered by time_range_id
    availabilities = Availability.query.filter(and_(Availability.expert_id == expert_id,
                                                    Availability.date >= start_date,
                                                    Availability.date <= end_date)).order_by(
        Availability.date, Availability.time_range_id).all()
    return {"availabilities": [availability.serialized for availability in availabilities]}


def get_experts_availabilities_by_week_and_categories(date, category_ids):
    """
    Get the availabilities of experts who are interested in the given categories on the given date. Group by expert.
    """

    # Get the experts who are interested in the given categories
    experts = User.query.filter(User.interested_categories.any(Category.id.in_(category_ids))).all()

    result = []
    # Get the availabilities of the experts on the given date
    for expert in experts:
        result.append({
            'expert': expert.serialized,
            **get_expert_availabilities_by_week(expert.id, date),
        })

    # Get the availabilities of the experts on the given date

    return {"result": result}


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
    print(availabilities)
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


def update_student_availability(data):
    """
    Updates the availability of a user.
    """
    return update_student_availabilities(data['student_id'], [data])


def update_student_availabilities(student_id, availabilities):
    for availability in availabilities:
        availability_db = Availability.query.filter_by(student_id=student_id, date=availability['date'],
                                                       time_range_id=availability['time_range_id']).first()
        if availability_db is None:
            availability_db = Availability(**availability)
            db.session.add(availability_db)
        else:
            availability_db.status = availability['status']
            availability_db.expert_id = availability.get('expert_id', None)
            availability_db.meeting_metadata = availability.get('meeting_metadata', None)

    db.session.commit()
    return get_student_availabilities(student_id)


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
