from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI(title="Order Service")

# Setup Postgres connection for Order Service
DB_URL = "postgresql://postgres:postgres@localhost:5432/happypaws_users"

@app.get("/")
def read_root():
    return {"service": "Order Service"}

@app.get("/products")
def get_products():
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, name, price, image_url as image FROM products")
        products = cur.fetchall()
        cur.close()
        conn.close()
        return products
    except Exception as e:
        print("DB Error:", e)
        return [
            {"id": 1, "name": "Premium Salmon Kibble", "price": 45.99, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Salmon+Kibble"},
            {"id": 2, "name": "Plush Donut Bed", "price": 34.50, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Donut+Bed"},
            {"id": 3, "name": "Interactive Laser Toy", "price": 18.99, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Laser+Toy"},
            {"id": 4, "name": "Organic Dog Treats", "price": 12.50, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Dog+Treats"},
            {"id": 5, "name": "Cat Tree Tower", "price": 120.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Cat+Tree"},
            {"id": 6, "name": "Heavy Duty Leash", "price": 25.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Leash"},
            {"id": 7, "name": "Stainless Steel Bowl", "price": 15.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Steel+Bowl"},
            {"id": 8, "name": "Pet Grooming Kit", "price": 40.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Grooming+Kit"},
            {"id": 9, "name": "Automatic Feeder", "price": 85.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Feeder"},
            {"id": 10, "name": "Self-Cleaning Litter Box", "price": 150.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Litter+Box"},
            {"id": 11, "name": "Squeaky Chew Toy", "price": 8.99, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Chew+Toy"},
            {"id": 12, "name": "Cozy Cat Cave", "price": 45.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Cat+Cave"},
            {"id": 13, "name": "Reflective Harness", "price": 28.50, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Harness"},
            {"id": 14, "name": "Puppy Training Pads", "price": 22.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Training+Pads"},
            {"id": 15, "name": "Ceramic Water Fountain", "price": 65.00, "image": "https://placehold.co/400x400/fce8eb/b22240?text=Fountain"}
        ]

class OrderReq(BaseModel):
    user_id: int
    product_ids: list

@app.post("/place-order")
def place_order(order: OrderReq):
    return {"msg": "Order placed successfully", "order_id": 12345}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8004, reload=True)
