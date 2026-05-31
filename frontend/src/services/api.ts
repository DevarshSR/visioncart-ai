const API_BASE_URL = "http://127.0.0.1:8000";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function scanProduct() {
  const response = await fetch(
    `${API_BASE_URL}/scan-product`
  );

  if (!response.ok) {
    throw new Error("Failed to scan product");
  }

  return response.json();
}

export async function uploadImage(image: File) {
  const formData = new FormData();

  formData.append("file", image);

  const response = await fetch(
    `${API_BASE_URL}/upload-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}