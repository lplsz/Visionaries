from apiflask import APIBlueprint
import wellbeing.meeting.controller as controller
from wellbeing.meeting.schemas import (
    BookingMeetingInSchema,
    BookMeetingOutSchema,
    GetAvailabilitiesOutSchema,
    PostAvailabilitiesInSchema,
    PostAvailabilityInSchema,
    PostAvailabilityOutSchema,
)

availability_blueprint = APIBlueprint('availability', __name__)


@availability_blueprint.get('/get_student_availabilities/<int:student_id>')
@availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@availability_blueprint.doc(
    summary='Get availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def get_user_availability(student_id):
    return controller.get_student_availabilities(student_id)


@availability_blueprint.get('/get_expert_availabilities/<int:expert_id>')
@availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@availability_blueprint.doc(
    summary='Get availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def get_expert_availability(expert_id):
    return controller.get_expert_availabilities(expert_id)


@availability_blueprint.post('/update_expert_availability')
@availability_blueprint.input(PostAvailabilityInSchema)
@availability_blueprint.output(PostAvailabilityOutSchema, 200)
@availability_blueprint.doc(
    summary='Update availability of user',
    responses={
        404: 'User Not Found',
    })
def update_expert_availability(data):
    return controller.update_expert_availabilty(data)


@availability_blueprint.post('/update_expert_availabilities')
@availability_blueprint.input(PostAvailabilitiesInSchema)
@availability_blueprint.output(GetAvailabilitiesOutSchema, 200)
@availability_blueprint.doc(
    summary='Update availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def update_expert_availabilities(data):
    return controller.update_expert_availabilities(data['expert_id'], data['availabilities'])


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
