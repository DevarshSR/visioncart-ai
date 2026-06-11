from pathlib import Path

# CHANGE THIS PATH
DATASET_PATH = r"C:\Users\devar\OneDrive\Desktop\Mini Projects\DL\Cart_AI\retail_datasets\raw\colgate"

LABEL_FOLDERS = [
    "train/labels",
    "valid/labels",
    "test/labels"
]

NEW_CLASS_ID = "1"

for folder in LABEL_FOLDERS:
    folder_path = Path(DATASET_PATH) / folder

    if not folder_path.exists():
        print(f"Folder not found: {folder_path}")
        continue

    txt_files = list(folder_path.glob("*.txt"))

    print(f"\nProcessing {folder}...")
    print(f"Found {len(txt_files)} label files")

    for txt_file in txt_files:
        updated_lines = []

        with open(txt_file, "r") as f:
            lines = f.readlines()

        for line in lines:
            parts = line.strip().split()

            if len(parts) < 5:
                continue

            # Replace old class id with 1
            parts[0] = NEW_CLASS_ID

            updated_lines.append(
                " ".join(parts)
            )

        with open(txt_file, "w") as f:
            for line in updated_lines:
                f.write(line + "\n")

print("\nDone!")
print("All Colgate variants are now class ID 1.")