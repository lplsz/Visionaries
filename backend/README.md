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