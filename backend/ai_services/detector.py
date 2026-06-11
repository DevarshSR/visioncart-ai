from ultralytics import YOLO
import time


model = YOLO("models/best.pt")


PRODUCT_DATABASE = {
    "Coca-Cola": {
        "id": 1,
        "price": 40
    },
    "Colgate": {
        "id": 2,
        "price": 65
    }
}

# Cooldown time (seconds)
COOLDOWN_SECONDS = 5

# Stores when each product was last added
LAST_DETECTED = {}


def detect_product(image_path):
    results = model(image_path)

    detections = []

    current_time = time.time()

    for result in results:
        boxes = result.boxes

        for box in boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            # Ignore weak detections
            if confidence < 0.70:
                continue

            product_name = model.names[class_id]

            # Cooldown check
            if product_name in LAST_DETECTED:
                elapsed = (
                    current_time
                    - LAST_DETECTED[product_name]
                )

                if elapsed < COOLDOWN_SECONDS:
                    continue

            # Update last detection time
            LAST_DETECTED[product_name] = current_time

            product_info = PRODUCT_DATABASE.get(
                product_name,
                {
                    "id": -1,
                    "price": 0
                }
            )

            detections.append(
                {
                    "id": product_info["id"],
                    "product_name": product_name,
                    "price": product_info["price"],
                    "confidence": round(
                        confidence,
                        2
                    )
                }
            )

    return detections