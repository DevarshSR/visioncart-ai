"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="p-8">
        <h1 className="text-4xl font-bold">
          AI Retail Platform
        </h1>

        <p className="mt-4 text-lg">
          Smart Autonomous Retail Checkout System
        </p>

        <div className="mt-8 rounded-lg bg-white p-4 shadow">
          <h2 className="text-xl font-semibold text-black">
            Products
          </h2>

          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded border p-3 bg-gray-50 text-black"
              >
                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-700">
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}