**Connect to EC2:** ssh -i /Users/peter/.ssh/wellbeing.pem ubuntu@ec2-54-206-26-58.ap-southeast-2.compute.amazonaws.com

**Public IPv4:** http://54.206.26.58:8000/

**Run gunicorn (Inside venv):** gunicorn -w 4 -b 0.0.0.0 'wellbeing.app:create_app()' --daemon &