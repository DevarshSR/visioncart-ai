from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from ai_services.detector import detect_product

import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads"
)

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
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
        "project": "VisionCart"
    }


@app.get("/products")
def get_products():
    return [
        {
            "id": 1,
            "name": "Coca-Cola",
            "price": 40
        },
        {
            "id": 2,
            "name": "Colgate",
            "price": 65
        }
    ]


@app.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...)
):
    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:
        buffer.write(
            await file.read()
        )

    result = detect_product(
        file_path
    )

    return result