import bcrypt

# noinspection PyUnresolvedReferences
from wellbeing.QA.models import QA, Category
from wellbeing.extensions import db
# noinspection PyUnresolvedReferences
from wellbeing.meeting.models import AvailableTimeRange, Meeting
# noinspection PyUnresolvedReferences
from wellbeing.thread.models import Thread

####################
#       User       #
####################

user_language = db.Table(
    "user_language",
    db.Column("user_id", db.ForeignKey("user.id"), primary_key=True),
    db.Column("language_id", db.ForeignKey("language.id"), primary_key=True),
)

user_category = db.Table(
    "user_category",
    db.Column("user_id", db.ForeignKey("user.id"), primary_key=True),
    db.Column("category_id", db.ForeignKey("category.id"), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    account_type = db.Column(db.Enum('student', 'expert', 'admin'), server_default='student', nullable=False)
    biography = db.Column(db.Text, nullable=True)
    profile_image_src = db.Column(db.Text, nullable=True)  # base64 encoded image

    # Relationships
    # # Profile
    languages = db.relationship('Language', lazy=False, uselist=True, back_populates='users', secondary=user_language)
    qualifications = db.relationship('Qualification', lazy=False, uselist=True, back_populates='user')

    # # Threads
    interested_categories = db.relationship('Category', lazy=False, uselist=True, backref='interested_users',
                                            secondary=user_category)
    threads = db.relationship('Thread', lazy=True, uselist=True, back_populates='user')
    replies = db.relationship('Reply', lazy=True, uselist=True, back_populates='user')
    qas = db.relationship('QA', lazy=True, uselist=True, back_populates='author')

    # # meeting
    available_time_ranges = db.relationship('AvailableTimeRange', lazy=True, uselist=True, back_populates='user')

    # meetings_as_user = db.relationship('Meeting', lazy=True, uselist=True, back_populates='user')
    # meetings_as_expert = db.relationship('Meeting', lazy=True, uselist=True, back_populates='expert')

    def __repr__(self):
        return f'<User {self.username} {self.email} {self.account_type}>'

    def set_password(self, password):
        self.password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode('utf-8'), self.password.encode('utf-8')
        )

    # @property
    # def serialized(self):
    #     return {
    #         'user_id': self.id,
    #         'email': self.email,
    #         'phone': self.phone,
    #         'firstname': self.firstname,
    #         'lastname': self.lastname,
    #     }


class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language_name = db.Column(db.Text, nullable=False)

    # Relationships
    users = db.relationship('User', lazy=False, uselist=True, back_populates='languages', secondary=user_language)

    def __repr__(self):
        return f'<Language {self.language_name}>'


class Qualification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    acquired_at = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, back_populates='qualifications')

    def __repr__(self):
        return f'<Qualification {self.qualification_name}>'
