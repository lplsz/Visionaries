# Visionaries

## Prerequisite

* Have `npm` and `python3` installed and accessible from the terminal.
    * [Installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) guide for npm
    * [Installation](https://www.google.com/search?q=install+python&oq=install+python&aqs=chrome..69i57l2j69i65j69i60l4.1551j0j4&sourceid=chrome&ie=UTF-8) for python
* Have MySQL server runned either remotely or locally. [Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)
* To use the book meeting functionality, follow the steps [here](https://developers.google.com/calendar/api/quickstart/python) and place the `credentials.json` under `backend/wellbeing/utility`.

## Installation

1. Download and unzip the downloaded source code

2. Install dependencies for the frontend

    * Under the frontend directory, run `npm install`

3. Install dependencies for the backend

    * Under the backend directory, runs the following commands in terminal

        ```
        python3 -m venv venv
        source venv/bin/activate
        pip3 install -r requirements.txt
        ```

4. Create a `.env` file under the backend root folder. Fill in the required information using the following template:

    * DATABASE_URL: The database connection string. Detail found at the [SQLAlchemy Doc](https://docs.sqlalchemy.org/en/14/core/engines.html#database-urls).
    * JWT_SECRET_KEY: The key used to sign the token issued. Genreate one by running `python -c 'import os; print(os.urandom(16))'` in the terminal.

    ```python
    # Environment variable overrides for local development
    FLASK_APP=autoapp.py
    FLASK_DEBUG=1
    FLASK_ENV=development
    DATABASE_URL=""
    GUNICORN_WORKERS=1
    LOG_LEVEL=debug
    JWT_SECRET_KEY=""
    JWT_ACCESS_TOKEN_EXPIRE=datetime.timedelta(days=1)
    ```

5. Initialize the database
    1. Ensure your MySQL server is up and running
    2. Navigate to the backend directory in the terminal
    3. Run `flask createdb`
    4. Run `flask seed`

## Start the System

> Ensure that you have followed the **Installation** steps before starting the system.

1. Under the backend directory, run

    ```
    source venv/bin/activate
    flask run
    ```

2. Under the frontend directory, run

    ```
    npm start
    ```

3. After running `npm start`, a url will be printed in the terminal, go to that link using any web browser to use our system.

## Useful Commands

### Backend

* Start the server: `flask run`
* Create database tables: `flask createdb`
* Drop database: `flask dropdb`
* Seed the database: `flask seed`

