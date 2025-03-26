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
docker run -e APP_ENV=development --platform linux/amd64 -d -p 8000:8000 -v $(pwd)/app:/app/app --name piper-container german-pronunciation-trainer-backend
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

### **Contributing**

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

---

### **License**
This project is licensed under the MIT License.

---

### **Contact**
For support or questions, contact: [sureshbabudh@gmail.com]
