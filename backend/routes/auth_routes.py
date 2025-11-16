from fastapi import APIRouter, HTTPException, status, Depends
from models.user_model import User, UserResponse
from config.db import db
from utils.hashing import hash_password, verify_password
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET_KEY = "your_secret_key"   # use env var in real apps
ALGORITHM = "HS256"

@router.post("/signup", response_model=UserResponse)
async def signup(user: User):
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = hash_password(user.password)
    user_dict = {"email": user.email, "password": hashed_pwd}
    await db["users"].insert_one(user_dict)
    return {"email": user.email}


@router.post("/signin")
async def signin(user: User):
    found_user = await db["users"].find_one({"email": user.email})
    if not found_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, found_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token_data = {
        "sub": user.email,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}
