from dotenv import load_dotenv
import os
import google.generativeai as genai
import logging

# Load environment variables from .env file
load_dotenv()

# Read secret keys from environment variables
gemini_secret_key = os.getenv('AIzaSyAAjGTA3vCIgkaMicSe8W1SuE9a80Urv9U')

# Configure API once
genai.configure(api_key=gemini_secret_key)

chat_history = []  # Initialize chat_history OUTSIDE the function

# This function takes the chat history user can receive reminders (Quran, duaas, quotes)
# based on their most recent conversation.
def manage_chat_history(message=None):
    global chat_history  # Access the global chat_history

    if message:
        chat_history.append(message)

    for msg in reversed(chat_history):
        if msg.get("role") == "model":
            return msg.get("message")
    return None

# This function takes the users query and provide them with advice 
# based on Quranic verses, duaas, and prophetic stories..
def chat_ai(message):
    system_prompt = f""" You are an empathic AI-powered assistant who listens and helps people
                        navigate through their emotions; provide them with a warm advice to help them
                        stay connected to Islam. Listen to the user and provide them
                        With advice based on Quranic verses and prophetic stories.
                        Also provide them with duas from Quran verses to recite often.
                        If you're asked a totally unrelated question, the response should be,
                        'I may not be able to provide information about this topic'
                        """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        return model.generate_content(message).text
    except Exception as e:
        logging.error(f"Error generating AI response: {e}")
        return "Sorry, there was an error processing your request."

# Function to generate goals from a paragraph
# This function takes the user monthly/weekly goals and the assistant
# can break them down into small achievable goals.
def generate_goals(goals):
    system_prompt = f"""Given a user monthly or weekly goals, break them down into small achievable
                        weekly goals from Sunday to Saturday for each of the days:{goals}."""
    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        ai_response = model.generate_content(goals).text.strip()
        list_goals = [goal.strip() for goal in ai_response.split("\n") if goal.strip()]
        return list_goals
    except Exception as e:
        logging.error(f"Error generating goals: {e}")
        return ["Sorry, there was an error generating goals."]
