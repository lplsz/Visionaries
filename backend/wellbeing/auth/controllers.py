from datetime import datetime, timezone

from apiflask import abort
from flask import current_app
from flask_jwt_extended import create_access_token, get_jwt, verify_jwt_in_request
from functools import wraps

from wellbeing.auth.models import TokenBlocklist
from wellbeing.extensions import db
from wellbeing.extensions import jwt
from wellbeing.user.models import User
from wellbeing.QA.models import Category

'''
JWT
'''


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims['account_type'] != 'admin':
                abort(401, 'Admin required')
            return current_app.ensure_sync(fn)(*args, **kwargs)

        return decorator

    return wrapper


'''
Authentication
'''


def register(data):
    """Register a new user."""
    if User.query.filter_by(email=data['email']).first():
        abort(409, 'User with the same email already exists.')

    user = User(**data)
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return {'user': user,
            'access_token': create_access_token(user, additional_claims={'account_type': user.account_type})}


def login(data):
    """Login a user."""
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return {'user': user,
                'access_token': create_access_token(user, additional_claims={'account_type': user.account_type})}
    abort(401, 'Invalid email or password')


def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return {'message': 'User logged out'}


def register_expert_account(data):
    if User.query.filter_by(email=data['email']).first():
        abort(409, 'User with the same email already exists.')

    user = User(
        username=data['username'],
        email=data['email'],
        account_type='expert',
    )
    user.set_password(data['password'])

    if 'interested_category_ids' in data:
        user.interested_category = Category.query.filter(Category.id.in_(data['interested_category_ids'])).all()

    db.session.add(user)
    db.session.commit()
    return {'user': user.serialized,
            'access_token': create_access_token(user, additional_claims={'account_type': user.account_type})}
