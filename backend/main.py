import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from twilio.rest import Client

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Spider-Man Portfolio Backend API",
    description="Python FastAPI backend powering contact submissions and messages for the portfolio.",
    version="1.0.0"
)

# CORS setup to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
DATABASE_URL = os.getenv("DATABASE_URL")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TARGET_PHONE_NUMBER = os.getenv("TARGET_PHONE_NUMBER")

def get_db_connection():
    if not DATABASE_URL:
        raise Exception("DATABASE_URL environment variable is not set")
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def init_db():
    if not DATABASE_URL:
        print("Warning: DATABASE_URL is not set. Database not initialized.")
        return
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("PostgreSQL Database initialized successfully.")
    except Exception as e:
        print(f"Error initializing database: {e}")

# Initialize Database on startup
init_db()

class ContactMessageRequest(BaseModel):
    name: str
    email: str
    message: str

class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: str

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "portfolio-backend",
        "timestamp": datetime.utcnow().isoformat()
    }

def send_sms_notification(name: str, email: str, message: str):
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TARGET_PHONE_NUMBER]):
        print("Warning: Twilio credentials not fully set. SMS notification skipped.")
        return
        
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        sms_body = f"🕷️ New Portfolio Message!\nFrom: {name}\nEmail: {email}\nMessage: {message}"
        
        message = client.messages.create(
            body=sms_body,
            from_=TWILIO_PHONE_NUMBER,
            to=TARGET_PHONE_NUMBER
        )
        print(f"[SMS Sent] Message SID: {message.sid}")
    except Exception as e:
        print(f"[SMS Error] Failed to send SMS: {e}")

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def submit_contact(data: ContactMessageRequest):
    if not data.name.strip() or not data.email.strip() or not data.message.strip():
        raise HTTPException(status_code=400, detail="All fields (name, email, message) are required.")
    
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO messages (name, email, message, created_at) VALUES (%s, %s, %s, %s) RETURNING id",
            (data.name.strip(), data.email.strip(), data.message.strip(), timestamp)
        )
        msg_id = cursor.fetchone()['id']
        conn.commit()
        cursor.close()
        conn.close()

        print(f"[New Contact Message] ID={msg_id} from {data.name} ({data.email}): {data.message[:50]}...")
        
        # Send SMS Notification
        send_sms_notification(data.name.strip(), data.email.strip(), data.message.strip())

        return {
            "success": True,
            "message": "Thanks for reaching out. I'll get back to you shortly.",
            "id": msg_id
        }
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while saving the message.")

@app.get("/api/messages", response_model=List[MessageResponse])
def get_all_messages():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, message, created_at FROM messages ORDER BY id DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return [
            MessageResponse(
                id=r['id'],
                name=r['name'],
                email=r['email'],
                message=r['message'],
                created_at=r['created_at']
            )
            for r in rows
        ]
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while retrieving messages.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
