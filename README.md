# German Pronunciation Training Application

This project is a Progressive Web Application (PWA) designed to help users improve their German pronunciation. It utilizes **offline speech recognition** and **Text-to-Speech (TTS)** to provide detailed, interactive feedback on pronunciation.

---

## **Features**

- Offline functionality for both speech recognition and TTS.
- Word-level pronunciation analysis with visual feedback.
- Audio recording and playback capabilities.
- Cross-platform compatibility (desktop and mobile).
- Clear and intuitive user interface for seamless learning.

---

## **Technology Stack**

### Backend:

- **FastAPI**: A modern, fast web framework.
- **Vosk**: Offline speech recognition (German model).
- **TTS Library**: An offline German Text-to-Speech library (e.g., Piper TTS).

### Frontend:

- **React**: For building the PWA.

### Audio Processing:

- **Pydub**: For audio conversion.

---

## **Setup Instructions**

### **Prerequisites**

Ensure the following are installed on your system:

1. **Python** (Version 3.9 or higher)
2. **Node.js** (Version 16 or higher)
3. **Docker** (Optional but recommended for deployment)

---

### **Backend Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/german-pronunciation-trainer.git
   cd backend
   ```

#### **Install dependencies:**

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

### **Frontend Setup**

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

---

### **Using Docker**

Build the Docker image for the backend:

```bash
docker build -e APP_ENV=production -t german-pronunciation-trainer-backend .
```

Run the container:

```bash
docker run -e APP_ENV=production -d -p 8000:8000 german-pronunciation-trainer-backend
```

##### Running with macos in local

To build the base image with python and Piper and its dependencies

```bash
docker build -e APP_ENV=development --platform linux/amd64  -f Dockerfile.base -t piper-base .
```

To load the app volume for local changes

```bash
docker run -e APP_ENV=development --platform linux/amd64 -d -p 8000:8000 -v $(pwd)/app:/app/app --name german-pronunciation-trainer-api german-pronunciation-trainer-backend
```

### **Dependencies**

#### Backend:

FastAPI: Web framework.

Vosk: Offline speech recognition.

Pydub: Audio processing.

TTS Library: For offline speech synthesis.

#### Frontend:

React: Frontend framework.

### **How It Works**

**Upload Audio:** The backend processes the audio using Vosk to generate word-level transcription and feedback.

**Pronunciation Feedback:** The application provides color-coded feedback for word accuracy (green for correct, red for incorrect, orange for deviation).

**Synthesized Speech:** Users can listen to the synthesized correct pronunciation using the TTS library.

---



### Prerequisites

Ensure you have the following tools installed and configured:

1. **Google Cloud CLI**: [Install](https://cloud.google.com/sdk/docs/install)
   - Configure the project ID: `gcloud config set project <your-project-id>`
   - Configure the compute region: `gcloud config set compute/region <your-region>`
2. **Firebase CLI**: [Install](https://firebase.google.com/docs/cli)
   - Log in: `firebase login`
3. **Docker**: [Install](https://www.docker.com/)
4. **Node.js and npm**: For frontend builds.

---

### Usage

Use the `deploy.sh` script for automated deployment of the frontend and backend.

Run the script as:

```bash
bash deploy.sh [OPTIONS]
```

---

## Deployment

### Prerequisites

Ensure you have the following tools installed and configured:

1. **Google Cloud CLI**: [Install](https://cloud.google.com/sdk/docs/install)
   - Configure the project ID: `gcloud config set project <your-project-id>`
   - Configure the compute region: `gcloud config set compute/region <your-region>`
2. **Firebase CLI**: [Install](https://firebase.google.com/docs/cli)
   - Log in: `firebase login`
3. **Docker**: [Install](https://www.docker.com/)
4. **Node.js and npm**: For frontend builds.

---

### Usage

Use the `deploy.sh` script for automated deployment of the frontend and backend.

Run the script as:

```bash
bash deploy.sh [OPTIONS]
```

#### Options:

- `--all`: Deploy both frontend and backend (default behavior).
- `--skip-backend`: Deploy only the frontend, skipping backend deployment.
- `--skip-frontend`: Deploy only the backend, skipping frontend deployment.

### Deployment Workflow

#### **Backend Deployment**

1.  Installs necessary TTS models using `setup_models.sh`.
2.  Builds and pushes the `piper-base` Docker image to GCR.
3.  Builds and pushes the backend Docker image to GCR.
4.  Deploys the backend image to Cloud Run.

#### **Frontend Deployment**

1.  Builds the React frontend using `npm run build`.
2.  Deploys the frontend to Firebase Hosting.

### Example Commands

Deploy both frontend and backend:

bas

```
bash deploy.sh --all
```

Deploy only the frontend:

bas

```
bash deploy.sh --skip-backend
```

Deploy only the backend:

bas

```
bash deploy.sh --skip-frontend
```

### Environment Variables

- **APP_ENV**: Defines the application environment.

  - Options: `production` (default) or `development`.

### GCP and Firebase Configuration

Ensure GCP and Firebase configurations:

1.  **Set GCP project ID**:

    ```
    gcloud config set project <your-project-id>
    ```

2.  **Set GCP region**:

    ```
    gcloud config set compute/region <your-region>
    ```

3.  **Set Firebase project**:

    ```
    firebase use --project <your-project-id>
    ```

### Troubleshooting

#### Backend Deployment:

- **Error pushing Docker images**:

  ```
  docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://gcr.io
  ```

#### Frontend Deployment:

- **Error deploying to Firebase**:

  - Verify Firebase project setup:

    ```
    firebase use --project <your-project-id>
    ```


---


## **Contributing**

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

---

## **License**

This project is licensed under the MIT License.

---

### **Contact**

For support or questions, contact: [sureshbabudh@gmail.com]
