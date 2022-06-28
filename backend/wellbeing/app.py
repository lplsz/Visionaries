# -*- coding: utf-8 -*-
"""The wellbeing module, containing the app factory function."""

from apiflask import APIFlask  # step one

from wellbeing import auth
from wellbeing.extensions import (
    jwt,
    db,
)


def create_app(config_object="wellbeing.settings"):
    """Create application factory, as explained here: http://flask.pocoo.org/docs/patterns/appfactories/.

    :param config_object: The configuration object to use.
    """
    app = APIFlask(__name__.split(".")[0])
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    # register_shellcontext(app)
    # register_commands(app)
    # configure_logger(app)
    configure_security_schemes(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    jwt.init_app(app)
    db.init_app(app)


def register_blueprints(app):
    """Register Flask blueprints."""
    app.register_blueprint(auth.views.blueprint)
    # app.register_blueprint(user.views.blueprint)


# def register_shellcontext(app):
#     """Register shell context objects."""
#
#     def shell_context():
#         """Shell context objects."""
#         return {"db": db, "User": user.models.User}
#
#     app.shell_context_processor(shell_context)
#
#
# def register_commands(app):
#     """Register Click commands."""
#     app.cli.add_command(commands.test)
#     app.cli.add_command(commands.lint)
#
#
# def configure_logger(app):
#     """Configure loggers."""
#     handler = logging.StreamHandler(sys.stdout)
#     if not app.logger.handlers:
#         app.logger.addHandler(handler)

def configure_security_schemes(app):
    app.security_schemes = {  # equals to use config SECURITY_SCHEMES
        'JWT Bearer Token': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
        },
    }
