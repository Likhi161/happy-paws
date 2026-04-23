from fastapi import FastAPI, Depends
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Appointment Service")

class Appointment(BaseModel):
    user_id: int
    pet_id: str
    service_type: str # visit, grooming, vaccination, checkup
    date: str

@app.get("/")
def read_root():
    return {"service": "Appointment Service"}

@app.post("/book")
def book_appointment(app_req: Appointment):
    # Placeholder for DB Logic
    return {"msg": "Appointment booked successfully", "details": app_req}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
