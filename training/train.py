from ultralytics import YOLO

if __name__ == "__main__":

    model = YOLO("yolov8n.pt")

    model.train(
        data=r"C:\Users\devar\OneDrive\Desktop\Mini Projects\DL\Cart_AI\retail_datasets\merged\data.yaml",
        epochs=20,
        imgsz=640,
        batch=4,
        workers=0,
        device=0,
        project="training_runs",
        name="coke_colgate_v1"
    )