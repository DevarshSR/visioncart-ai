from pathlib import Path
import shutil

BASE_PATH = Path(
    r"C:\Users\devar\OneDrive\Desktop\Mini Projects\DL\Cart_AI\retail_datasets"
)

COCA_PATH = BASE_PATH / "raw" / "coca_cola"
COLGATE_PATH = BASE_PATH / "raw" / "colgate"

MERGED_PATH = BASE_PATH / "merged"

SPLITS = [
    "train",
    "valid",
    "test"
]

# -------------------------
# Create folders
# -------------------------

for split in SPLITS:
    (MERGED_PATH / split / "images").mkdir(
        parents=True,
        exist_ok=True
    )

    (MERGED_PATH / split / "labels").mkdir(
        parents=True,
        exist_ok=True
    )

# -------------------------
# Copy function
# -------------------------

def copy_dataset(
    source_path,
    prefix
):
    for split in SPLITS:

        image_source = (
            source_path
            / split
            / "images"
        )

        label_source = (
            source_path
            / split
            / "labels"
        )

        for image_file in image_source.iterdir():

            new_name = (
                prefix
                + "_"
                + image_file.name
            )

            shutil.copy2(
                image_file,
                MERGED_PATH
                / split
                / "images"
                / new_name
            )

        for label_file in label_source.iterdir():

            new_name = (
                prefix
                + "_"
                + label_file.name
            )

            shutil.copy2(
                label_file,
                MERGED_PATH
                / split
                / "labels"
                / new_name
            )


# -------------------------
# Copy datasets
# -------------------------

copy_dataset(
    COCA_PATH,
    "coke"
)

copy_dataset(
    COLGATE_PATH,
    "colgate"
)

# -------------------------
# Create YAML
# -------------------------

yaml_text = """train: ../train/images
val: ../valid/images
test: ../test/images

nc: 2

names:
  0: Coca-Cola
  1: Colgate
"""

with open(
    MERGED_PATH / "data.yaml",
    "w"
) as f:
    f.write(yaml_text)

print()
print("===================================")
print("Merged dataset created successfully!")
print("Location:")
print(MERGED_PATH)
print("===================================")