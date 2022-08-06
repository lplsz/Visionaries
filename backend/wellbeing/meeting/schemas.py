from apiflask import Schema
from apiflask.fields import Integer, String, DateTime, Nested, List, Date

from wellbeing.user.schemas import UserSchema


class TimeRangeSchema(Schema):
    id = Integer(required=True, example='1')
    start_at = DateTime(required=True)
    end_at = DateTime(required=True)


class AvailabilitySchema(Schema):
    expert_id = Integer()
    student_id = Integer()
    time_range = Nested(TimeRangeSchema)
    status = String(example='booked')
    date = DateTime()
    meeting_metadata = String()


'''
    Put straight into DB
'''


class PostAvailabilitySchema(Schema):
    expert_id = Integer()
    date = Date()
    time_range_id = Integer()
    status = String(example='booked')
    meeting_metadata = String()
    student_id = Integer()


class PostAvailabilitiesInSchema(Schema):
    expert_id = Integer(required=True)
    availabilities = List(Nested(PostAvailabilitySchema))


'''
    available and meetings are not conflicted
'''


class GetAvailabilitiesOutSchema(Schema):
    availabilities = List(Nested(AvailabilitySchema))


'''
Meeting Schema
'''


class BookingMeetingInSchema(Schema):
    expert_id = Integer(required=True)
    student_id = Integer(required=True)
    date = Date(required=True)
    time_range_id = Integer(required=True)


class BookMeetingOutSchema(Schema):
    meeting = Nested(AvailabilitySchema)
