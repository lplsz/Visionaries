from wellbeing.extensions import db
from wellbeing.user.models import User


def register(data):
    """Register a new user."""
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'User with the same email already exists.'}, 409

    user = User(**data)
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return {'user': user, 'access_token': 'abc'}, 201


def login(data):
    """Login a user."""
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return {'user': user, 'access_token': 'abc'}, 200
    return {'message': 'Invalid email or password'}, 401
