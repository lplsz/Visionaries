from apiflask import APIBlueprint

import wellbeing.meeting.controller as controller
from wellbeing.meeting.schemas import (
    BookingMeetingInSchema,
    BookMeetingOutSchema,
    GetAvailabilitiesOutSchema,
    PostExpertAvailabilitiesInSchema,
    GetExpertAvailabilityByDateInSchema,
    GetExpertAvailabilityByDateAndCategoryInSchema,
    GetExpertAvailabilityByDateAndCategoryOutSchema,
    GetAvailabilitiesByDateOutSchema,
)

expert_availability_blueprint = APIBlueprint('expert_availability', __name__)

'''
Expert availabilities
'''


@expert_availability_blueprint.get('/get_expert_availabilities_by_date')
@expert_availability_blueprint.input(GetExpertAvailabilityByDateInSchema, location='query')
@expert_availability_blueprint.output(GetAvailabilitiesByDateOutSchema, 200)
@expert_availability_blueprint.doc(
    summary="Get a day's availabilities of an expert order by time asc",
    responses={
        404: 'User Not Found',
    })
def get_expert_availabilities_by_date(data):
    return {'availabilities': controller.get_expert_availabilities_by_date(data['expert_id'], data['date'])}


@expert_availability_blueprint.get('/get_expert_availabilities_by_week')
@expert_availability_blueprint.input(GetExpertAvailabilityByDateInSchema, location='query')
@expert_availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@expert_availability_blueprint.doc(
    summary="Get a week's (Mon - Fri) availability matrix of an expert. Not containing past availabilities (before "
            "today)",
    description="Availabilities are grouped by date and ordered by time_range_id",
    responses={
        404: 'User Not Found',
    })
def get_expert_availabilities_by_week(data):
    return {'availabilities': controller.get_expert_availabilities_by_week(data['expert_id'], data['date'])}


@expert_availability_blueprint.get('/get_experts_availabilities_by_week_and_categories')
@expert_availability_blueprint.input(GetExpertAvailabilityByDateAndCategoryInSchema, location='query')
@expert_availability_blueprint.output(GetExpertAvailabilityByDateAndCategoryOutSchema, 200)
@expert_availability_blueprint.doc(
    summary="Get a week's availabilities of all experts into the category_ids order by date, time asc.  Not "
            "containing past availabilities (before today)",
)
def get_experts_availabilities_by_week_and_categories(data):
    return {'result': controller.get_experts_availabilities_by_week_and_categories(data['date'], data['category_ids'])}


# @expert_availability_blueprint.post('/update_expert_availability')
# @expert_availability_blueprint.input(PostAvailabilityInSchema)
# @expert_availability_blueprint.output(PostAvailabilityOutSchema, 200)
# @expert_availability_blueprint.doc(
#     summary='Update availability of expert',
#     responses={
#         404: 'User Not Found',
#     })
# def update_expert_availability(data):
#     return controller.update_expert_availability(data)


@expert_availability_blueprint.post('/update_expert_availabilities')
@expert_availability_blueprint.input(PostExpertAvailabilitiesInSchema)
# @expert_availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@expert_availability_blueprint.doc(
    summary='Update availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def update_expert_availabilities(data):
    return controller.update_expert_availabilities(data['expert_id'], data['availabilities'])


'''
Student availabilities
'''

student_availability_blueprint = APIBlueprint('student_availability', __name__)


@student_availability_blueprint.get('/get_student_availabilities/<int:student_id>')
@student_availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@student_availability_blueprint.doc(
    summary='Get availabilities of a student, ordered by date, time asc',
    responses={
        404: 'User Not Found',
    })
def get_user_availability(student_id):
    return controller.get_student_availabilities(student_id)


# @student_availability_blueprint.post('/update_student_availability')
# @student_availability_blueprint.input(PostAvailabilityInSchema)
# @student_availability_blueprint.output(PostAvailabilityOutSchema, 200)
# @student_availability_blueprint.doc(
#     summary='Update availability of student',
#     responses={
#         404: 'User Not Found',
#     })
# def update_student_availability(data):
#     return controller.update_student_availability(data)
#
#
# @student_availability_blueprint.post('/update_student_availabilities')
# @student_availability_blueprint.input(PostStudentAvailabilitiesInSchema)
# @student_availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
# @student_availability_blueprint.doc(
#     summary='Update availabilities of student',
#     responses={
#         404: 'User Not Found',
#     })
# def update_student_availabilities(data):
#     return controller.update_student_availabilities(data['student_id'], data['availabilities'])


'''
Meeting
'''

meeting_blueprint = APIBlueprint('meeting', __name__)


@meeting_blueprint.post('/make_booking')
@meeting_blueprint.input(BookingMeetingInSchema)
@meeting_blueprint.output(BookMeetingOutSchema, 200)
@meeting_blueprint.doc(
    summary='Book a meeting with expert',
    responses={
        200: 'Meeting booked',
        404: 'User Not Found',
        409: 'Expert is not available'
    })
def book_meeting(data):
    return controller.make_booking(data['expert_id'], data['student_id'], data['date'], data['time_range_id'])
