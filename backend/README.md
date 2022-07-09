# Prerequisites

* Place the `.env`  file under the `/backend` folder

# Instruction

**Step 1: Clone this repository**

Clone the repository to desired directory

**Step 2: Install dependencies**

```
cd /Visionaries/backend

python3 -m venv venv
source venv/bin/activate

python3 -m pip install -r requirements.txt
```

**Step 3: Clear the AWS database (Optional)**

```
flask createdb
flask dropdb
```

**Step 4: Seed (Initialize) the database (Optional)**

```
flask seed
```

**Step 5: Start the flask server**

```
cd /Visionaries/backend

flask run
```

After starting the server, Swagger UI documentation is available at `<hostname>:<port>/docs`.

# Database Operations

**Create all tables**

```
flask createdb
```

**Drop all tables**

```
flask dropdb
```

**Seed database using `backend/seeding_data.json`**

```
flask seed
```

# Folder Structure

```
backend
┣ app
┃ ┣ auth # The auth module
┃ ┃ ┣ __init__.py
┃ ┃ ┣ views.py # Routes of this module
┃ ┃ ┣ controllers.py # Manipulate db
┃ ┃ ┣ schemas.py # API Schemas
┃ ┃ ┗ models.py # Schemas related to this module
┃ ┃
┃ ┣ app.py # App factory + Module register
┃ ┣ commands.py # Cli commands
┃ ┣ models.py # DB Schema
┃ ┣ extensions.py # Instantiate extensions. e.g. db
┃ ┣ settings.py # Get ENV variables
┃ ┗ utils.py # Utility functions
┃
┣ README.md
┣ app.py # App entry point, defines cli
┣ config.py # Run-time config
┣ .env # Environment variables
┗ requirements.txt # Python dependencies
```