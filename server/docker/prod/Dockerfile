# Use an official Python runtime as the base image
FROM python

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /django

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m pip install django-debug-toolbar

# Copy the Django app code to the working directory
COPY . .

# Expose the port on which the Django app will run
EXPOSE 8000

# Start the Django app
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
# CMD exec gunicorn --bind 0.0.0.0:8000 --workers 2 --threads 8 --timeout 0 --reload mysite.wsgi:application
