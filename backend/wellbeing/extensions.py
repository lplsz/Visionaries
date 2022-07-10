# -*- coding: utf-8 -*-
"""Extensions module. Each extension is initialized in the wellbeing factory located in wellbeing.py."""
# from flask_bcrypt import Bcrypt
# from flask_caching import Cache
# from flask_debugtoolbar import DebugToolbarExtension
# from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

# from flask_static_digest import FlaskStaticDigest
# from flask_wtf.csrf import CSRFProtect

# bcrypt = Bcrypt()
# csrf_protect = CSRFProtect()
jwt = JWTManager()
db = SQLAlchemy()
# migrate = Migrate()
# cache = Cache()
# debug_toolbar = DebugToolbarExtension()
# flask_static_digest = FlaskStaticDigest()