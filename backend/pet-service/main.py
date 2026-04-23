from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import uvicorn
from typing import List

app = FastAPI(title="Pet Service")

try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client.happypaws
    pets_collection = db.pets
except Exception as e:
    print(f"MongoDB connection failed: {e}")

class Pet(BaseModel):
    name: str
    type: str
    breed: str
    age: int
    image_url: str

@app.get("/")
def read_root():
    return {"service": "Pet Service"}

@app.get("/pets")
def get_pets():
    try:
        pets = []
        for p in pets_collection.find():
            p["_id"] = str(p["_id"])
            pets.append(p)
        return pets
    except:
        return []

@app.post("/pets")
def add_pet(pet: Pet):
    try:
        pets_collection.insert_one(pet.dict())
        return {"msg": "Pet added successfully"}
    except:
        return {"msg": "DB error"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
