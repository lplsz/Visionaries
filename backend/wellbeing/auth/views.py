from apiflask import APIBlueprint
from flask.views import MethodView
from flask_jwt_extended import jwt_required

import wellbeing.auth.controllers as controllers
from wellbeing.auth.schemas import (
    RegisterInSchema,
    RegisterOutSchema,
    LoginInSchema,
    LoginOutSchema,
    RegisterExpertAccountInSchema,
)

blueprint = APIBlueprint('auth', __name__)


@blueprint.route('/register')
class Register(MethodView):

    @blueprint.input(RegisterInSchema)
    @blueprint.output(RegisterOutSchema, 201)
    @blueprint.doc(
        summary='Register a new user',
        description='Register a new user',
        responses={
            201: "User created",
            409: "User with the same email already exists",
        })
    def post(self, data):
        return controllers.register(data)


@blueprint.route('/login')
class Login(MethodView):

    @blueprint.input(LoginInSchema)
    @blueprint.output(LoginOutSchema, 200)
    @blueprint.doc(
        summary='Login a user',
        description='Login a user',
        responses={
            200: "User logged in",
            401: "Invalid email or password",
        })
    def post(self, data):
        return controllers.login(data)


@blueprint.route('/logout')
class Logout(MethodView):

    @blueprint.doc(
        security='JWT Bearer Token',
        summary='Logout a user',
        description='Logout a user',
        responses={
            200: "User logged out",
            401: "Invalid Token",
        })
    @jwt_required()
    def post(self):
        return controllers.logout()


@blueprint.route('/register_expert_account')
class RegisterExpertAccount(MethodView):
    @blueprint.input(RegisterExpertAccountInSchema)
    @blueprint.doc(
        summary='Register a new expert account',
        description='Register a new expert account',
        responses={
            201: "User created",
            409: "User with the same email already exists",
        })
    def post(self, data):
        pass
