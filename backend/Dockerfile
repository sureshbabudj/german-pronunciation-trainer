# Use the Piper base image
FROM piper-base

WORKDIR /app

# Copy your application code
COPY . /app

# Copy the entire models folder
COPY app/models /app/models

# Install additional Python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for FastAPI
EXPOSE 8000

# Define a default environment variable
ENV APP_ENV=production

# Use a dynamic CMD based on the APP_ENV variable
CMD if [ "$APP_ENV" = "production" ]; then \
      uvicorn app.main:app --host 0.0.0.0 --port 8000; \
    else \
      uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload; \
    fi
