from apiflask import APIBlueprint
import wellbeing.meeting.controller as controller
from wellbeing.meeting.schemas import (
    BookingMeetingInSchema,
    BookMeetingOutSchema,
    GetAvailabilitiesOutSchema,
    PostAvailabilitiesInSchema,
)

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


@meeting_blueprint.get('/get_availabilities/<int:user_id>')
@meeting_blueprint.output(GetAvailabilitiesOutSchema, 200)
@meeting_blueprint.doc(
    summary='Get availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def get_availability(user_id):
    return controller.get_availabilities(user_id)


@meeting_blueprint.post('/update_availabilities')
@meeting_blueprint.input(PostAvailabilitiesInSchema)
@meeting_blueprint.output(GetAvailabilitiesOutSchema, 200)
@meeting_blueprint.doc(
    summary='Update availabilities of expert',
    responses={
        404: 'User Not Found',
    })
def update_availabilities(data):
    return controller.update_availabilities(data['expert_id'], data['availabilities'])
