import json
from pathlib import Path

from wellbeing.extensions import db
from wellbeing.user.models import User
from wellbeing.QA.models import QA, Tag, Category, QATag

SEEDING_DATA_PATH = Path(__file__).absolute().parents[2] / "seeding_data.json"


def seed_database():
    with open(SEEDING_DATA_PATH, 'r') as f:
        data = json.load(f)

        for user in data['user']:
            db.session.add(User(**user))

        for category in data['category']:
            db.session.add(Category(**category))

        for tag in data['tag']:
            db.session.add(Tag(**tag))

        for qa in data['qa']:
            db.session.add(QA(**qa))

        try:
            db.session.commit()

            for qa_tag in data['qa_tag']:
                db.session.add(QATag(**qa_tag))
                
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e


if __name__ == '__main__':
    seed_database()
