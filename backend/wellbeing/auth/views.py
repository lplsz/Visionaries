from apiflask import APIBlueprint
from flask.views import MethodView

import controllers
from wellbeing.auth.schemas import RegisterInSchema, RegisterOutSchema, LoginInSchema, LoginOutSchema

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
