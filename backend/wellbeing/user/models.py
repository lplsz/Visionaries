import bcrypt

from wellbeing.QA.models import QA, Category
from wellbeing.extensions import db
from wellbeing.meeting.models import Availability
from wellbeing.thread.models import Thread


####################
#       User       #
####################

class UserLanguage(db.Model):
    __tablename__ = "user_language"
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    language_id = db.Column(db.Integer, db.ForeignKey("language.id"), primary_key=True)


class UserCategory(db.Model):
    __tablename__ = "user_category"
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), primary_key=True)


class UserQualification(db.Model):
    __tablename__ = "user_qualification"
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    qualification_id = db.Column(db.Integer, db.ForeignKey("qualification.id"), primary_key=True)


class UserExperience(db.Model):
    __tablename__ = "user_experience"
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    experience_id = db.Column(db.Integer, db.ForeignKey("experience.id"), primary_key=True)


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
    languages = db.relationship('Language', lazy=False, uselist=True, back_populates='users',
                                secondary=UserLanguage.__tablename__)
    qualifications = db.relationship('Qualification', lazy=False, uselist=True, back_populates='user',
                                     secondary=UserQualification.__tablename__)

    # TODO: Experience
    experiences = db.relationship('Experience', lazy=False, uselist=True, back_populates='user',
                                  secondary=UserExperience.__tablename__)

    # # Threads
    interested_categories = db.relationship('Category', lazy=False, uselist=True, backref='interested_users',
                                            secondary=UserCategory.__tablename__)
    threads = db.relationship('Thread', lazy=True, uselist=True, back_populates='user')
    replies = db.relationship('Reply', lazy=True, uselist=True, back_populates='user')
    qas = db.relationship('QA', lazy=True, uselist=True, back_populates='author')

    # # meeting
    availability_as_user = db.relationship('Availability', foreign_keys='Availability.user_id', lazy=True, uselist=True,
                                           back_populates='user')
    availability_as_expert = db.relationship('Availability', foreign_keys='Availability.expert_id', lazy=True,
                                             uselist=True, back_populates='expert')

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
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email,
    #         'account_type': self.account_type,
    #         'biography': self.biography,
    #         'profile_image_src': self.profile_image_src,
    #         'languages': self.languages,
    #         'qualifications': self.qualifications,
    #         'interested_categories': self.interested_categories,
    #     }


class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language_name = db.Column(db.Text, nullable=False)

    # Relationships
    users = db.relationship('User', lazy=False, uselist=True, back_populates='languages',
                            secondary=UserLanguage.__tablename__)

    def __repr__(self):
        return f'<Language {self.language_name}>'


class Qualification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    acquired_at = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, back_populates='qualifications')


# TODO: Experience
class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Relationships
    user = db.relationship('User', lazy=False, back_populates='experiences')
