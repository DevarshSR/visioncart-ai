from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi import UploadFile, File

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI Retail Backend Running"
    }


@app.get("/status")
def status():
    return {
        "status": "running",
        "project": "AI Retail Platform"
    }

@app.get("/products")
def get_products():
    return [
        {
            "id": 1,
            "name": "Coca Cola",
            "price": 40
        },
        {
            "id": 2,
            "name": "Lays Chips",
            "price": 20
        },
        {
            "id": 3,
            "name": "KitKat",
            "price": 30
        }
    ]

@app.get("/scan-product")
def scan_product():
    return {
        "id": 1,
        "name": "Coca Cola",
        "price": 40
    }

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "message": "Image received successfully"
    }