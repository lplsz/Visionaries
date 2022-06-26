import bcrypt

from app.extensions import db


####################
#  Authentication  #
####################

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


class RegisterPhone2FA(db.Model):
    phone = db.Column(db.String(15), primary_key=True)  # E.164 format
    last_sent_at = db.Column(db.DateTime, nullable=True)


class PWResetPhone2FA(db.Model):
    phone = db.Column(db.String(15), primary_key=True)  # E.164 format
    last_sent_at = db.Column(db.DateTime, nullable=True)


####################
#       User       #
####################

user_language = db.Table(
    "user_language",
    db.Column("user_id", db.ForeignKey("user.id"), primary_key=True),
    db.Column("language_id", db.ForeignKey("language.id"), primary_key=True),
)

user_experience = db.Table(
    "user_experience",
    db.Column("user_id", db.ForeignKey("user.id"), primary_key=True),
    db.Column("experience_id", db.ForeignKey("experience.id"), primary_key=True),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    account_type = db.Column(db.Enum(('student', 'expert')), nullable=False)
    biography = db.Column(db.Text, nullable=True)
    profile_image = db.Column(db.Text, nullable=True)  # base64 encoded image

    # Relationships
    # # Profile
    languages = db.relationship('Language', lazy=False, useList=True, back_populates='users', secondary=user_language)
    experiences = db.relationship('Experience', lazy=False, useList=True, back_populates='users',
                                  secondary=user_experience)
    qualifications = db.relationship('Qualification', lazy=False, useList=True, back_populates='user')

    # # Threads
    threads = db.relationship('Thread', lazy=True, useList=True, back_populates='user')
    replies = db.relationship('Reply', lazy=True, useList=True, back_populates='user')
    qas = db.relationship('QA', lazy=True, useList=True, back_populates='user')

    # # meeting
    available_time_ranges = db.relationship('AvailableTimeRange', lazy=True, useList=True, back_populates='user')

    meetings_as_user = db.relationship('Meeting', lazy=True, useList=True, back_populates='user')
    meetings_as_export = db.relationship('Meeting', lazy=True, useList=True, back_populates='expert')

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
    users = db.relationship('User', lazy=False, useList=True, back_populates='languages', secondary=user_language)

    def __repr__(self):
        return f'<Language {self.language_name}>'


class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experience_name = db.Column(db.Text, nullable=False)

    # Relationships
    users = db.relationship('User', lazy=False, useList=True, back_populates='experiences', secondary=user_experience)

    def __repr__(self):
        return f'<Experience {self.experience_name}>'


class Qualification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    acquired_at = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, back_populates='qualifications')

    def __repr__(self):
        return f'<Qualification {self.qualification_name}>'
