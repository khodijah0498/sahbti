from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List
from utils import *  # Ensure this contains necessary utility functions like chat_ai, generate_goals, etc.
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# FastAPI app
app = FastAPI()
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List
from utils import *  # Ensure this contains necessary utility functions like chat_ai, generate_goals, etc.
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import logging

# FastAPI app
app = FastAPI()

# CORS configuration
origins = ['*']  # In production, restrict to specific domains like ["http://localhost:19006", "https://your-production-domain.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Pydantic models for request and response validation
class ChatModel(BaseModel):
    role: str
    message: str

class ChatResponse(BaseModel):
    response: str

class GoalsRequest(BaseModel):
    goals_paragraph: str

class GoalsResponse(BaseModel):
    weekly_monthly_goals: list

class ReminderResponse(BaseModel):
    reminder: str
    timestamp: str

# AI chatbot endpoint
@app.post("/ai-chatbot", response_model=ChatResponse)
async def ai_chatbot(request: ChatModel):
    """
    Endpoint to process users' query and provide them with advice based on
    Quranic verses, duas, and prophetic stories.
    """
    query = request.message
    if not query:
        raise HTTPException(status_code=400, detail="Chat field cannot be empty.")
    
    try:
        response = chat_ai(query)
        return ChatResponse(response=response)
    except Exception as e:
        logging.error(f"Error processing AI chatbot request: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# Daily Goals generation endpoint
@app.post("/generate-goals", response_model=GoalsResponse)
async def monthly_weekly_goals(request: GoalsRequest):
    """
    Endpoint to process user input goals and return monthly/weekly goals.
    """
    query = request.goals_paragraph.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Goals field cannot be empty.")
    
    try:
        logging.debug(f"Received goals paragraph: {query}")
        response = generate_goals(query)
        return GoalsResponse(weekly_monthly_goals=response)
    except Exception as e:
        logging.error(f"Error generating goals: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating goals: {str(e)}")

# Endpoint to generate and retrieve a reminder
@app.get("/get-reminder", response_model=ReminderResponse)
async def get_reminder():
    """
    Set a smart reminder based on the most recent response from the model.
    """
    try:
        recent_response = manage_chat_history()

        if not recent_response:
            return ReminderResponse(reminder="No recent activity found.", timestamp=datetime.now().isoformat())

        reminder = f"Your smart reminder: {recent_response}"
        timestamp = datetime.now().isoformat()

        return ReminderResponse(reminder=reminder, timestamp=timestamp)
    except Exception as e:
        logging.error(f"Error generating reminder: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating reminder: {str(e)}")


# CORS configuration
origins = ['*']  # In production, restrict to specific domains like ["http://localhost:19006", "https://your-production-domain.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request and response validation
class ChatModel(BaseModel):
    role: str
    message: str

class ChatResponse(BaseModel):
    response: str

class GoalsRequest(BaseModel):
    goals_paragraph: str

class GoalsResponse(BaseModel):
    weekly_monthly_goals: list

class ReminderResponse(BaseModel):
    reminder: str
    timestamp: str

# AI chatbot endpoint
@app.post("/ai-chatbot", response_model=ChatResponse)
async def ai_chatbot(request: ChatModel):
    """
    Endpoint to process users' query and provide them with advice based on
    Quranic verses, duas, and prophetic stories.
    """
    query = request.message
    if not query:
        raise HTTPException(status_code=400, detail="Chat field cannot be empty.")
    
    try:
        response = chat_ai(query)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# Daily Goals generation endpoint
@app.post("/generate-goals", response_model=GoalsResponse)
async def monthly_weekly_goals(request: GoalsRequest):
    """
    Endpoint to process user input goals and return monthly/weekly goals.
    """
    query = request.goals_paragraph.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Goals field cannot be empty.")
    
    try:
        response = generate_goals(query)
        return GoalsResponse(weekly_monthly_goals=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating goals: {str(e)}")

# Endpoint to generate and retrieve a reminder
@app.get("/get-reminder", response_model=ReminderResponse)
async def get_reminder():
    """
    Set a smart reminder based on the most recent response from the model.
    """
    try:
        recent_response = manage_chat_history()

        if not recent_response:
            return ReminderResponse(reminder="No recent activity found.", timestamp=datetime.now().isoformat())

        reminder = f"Your smart reminder: {recent_response}"
        timestamp = datetime.now().isoformat()

        return ReminderResponse(reminder=reminder, timestamp=timestamp)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating reminder: {str(e)}")
