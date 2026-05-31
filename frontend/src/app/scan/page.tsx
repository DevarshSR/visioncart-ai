"use client";

import { useState } from "react";
import { uploadImage } from "../../services/api";

export default function ScanPage() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      const response = await uploadImage(
        selectedFile
      );

      setResult(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold">
        Product Scanner
      </h1>

      <p className="mt-4 text-lg">
        Upload a product image
      </p>

      <input
        type="file"
        accept="image/*"
        className="mt-6 block"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={handleUpload}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Upload Image
      </button>

      {result && (
        <div className="mt-8 rounded-lg bg-white p-4 shadow">
          <h2 className="text-xl font-semibold text-black">
            Backend Response
          </h2>

          <p className="mt-2 text-black">
            Filename: {result.filename}
          </p>

          <p className="text-gray-700">
            {result.message}
          </p>
        </div>
      )}
    </main>
  );
}