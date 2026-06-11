"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { uploadImage } from "../../services/api";
import CameraFeed from "../../components/CameraFeed";

export default function ScanPage() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [result, setResult] =
    useState<any[]>([]);

  const [receipt, setReceipt] =
    useState<any[]>([]);

  const [showReceipt, setShowReceipt] =
    useState(false);

  const [receiptNumber, setReceiptNumber] =
    useState(1001);

  const addToCart = (
    response: any[]
  ) => {
    setResult((previousCart: any[]) => {
      const updatedCart = [
        ...previousCart,
      ];

      response.forEach(
        (newItem: any) => {
          const existingItem =
            updatedCart.find(
              (item) =>
                item.id ===
                newItem.id
            );

          if (existingItem) {
            existingItem.quantity =
              (
                existingItem.quantity ||
                1
              ) + 1;
          } else {
            updatedCart.push({
              ...newItem,
              quantity: 1,
            });
          }
        }
      );

      return [...updatedCart];
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert(
        "Please select an image first"
      );
      return;
    }

    try {
      const response =
        await uploadImage(
          selectedFile
        );

      addToCart(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCameraCapture =
    async (file: File) => {
      try {
        const response =
          await uploadImage(
            file
          );

        addToCart(response);
      } catch (error) {
        console.error(error);
      }
    };

  const total = result.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  const totalProducts =
    result.reduce(
      (sum, item) =>
        sum +
        item.quantity,
      0
    );

  const clearCart = () => {
    setResult([]);
  };

  const handleCheckout = () => {
    if (result.length === 0) {
      alert(
        "Cart is empty"
      );
      return;
    }

    setReceipt([...result]);

    setShowReceipt(true);

    setResult([]);

    setReceiptNumber(
      receiptNumber + 1
    );
  };

  const receiptTotal =
    receipt.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 p-8">

      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-2xl bg-gradient-to-r from-green-700 to-green-600 p-8 shadow-xl"
        >

          <h1 className="text-center text-5xl font-extrabold text-white">
            🛒 Smart Retail Checkout
          </h1>

          <p className="mt-3 text-center text-lg text-green-100">
            AI Powered Autonomous Shopping System
          </p>

          <div className="mt-5 flex justify-center">
            <span className="rounded-full bg-green-500 px-5 py-2 text-sm font-bold text-white shadow">
              🟢 AI ONLINE
            </span>
          </div>

        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-8 grid gap-4 md:grid-cols-4"
        >

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="rounded-xl bg-white p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-gray-500">
              Products
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {totalProducts}
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="rounded-xl bg-white p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-gray-500">
              Revenue
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-700">
              ₹{total}
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="rounded-xl bg-white p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-gray-500">
              Accuracy
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-700">
              91%
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="rounded-xl bg-white p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-gray-500">
              Status
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-700">
              Online
            </p>
          </motion.div>

        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div>

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="rounded-2xl border-2 border-green-100 bg-white p-6 shadow-xl"
            >

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-black">
                  📷 AI Detection Feed
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Monitoring
                </span>

              </div>

              <div className="mt-4">
                <CameraFeed
                  onCapture={
                    handleCameraCapture
                  }
                />
              </div>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="mt-6 rounded-2xl bg-white p-6 shadow-xl"
            >

              <h2 className="text-2xl font-bold text-black">
                📤 Manual Upload
              </h2>

              <p className="mt-2 text-gray-500">
                Upload a product image for AI detection
              </p>

              <input
                type="file"
                accept="image/*"
                className="mt-5 block w-full rounded-lg border p-3"
                onChange={(e) => {
                  if (
                    e.target.files?.[0]
                  ) {
                    setSelectedFile(
                      e.target.files[0]
                    );
                  }
                }}
              />

              <button
                onClick={
                  handleUpload
                }
                className="mt-4 w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Upload Product
              </button>

            </motion.div>

          </div>

          <div>

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="rounded-2xl bg-white p-6 shadow-xl"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-black">
                  🛒 Current Transaction
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                  Live Cart
                </span>

              </div>

              {result.length === 0 ? (
                <div className="mt-8 rounded-xl bg-red-50 p-6 text-center">
                  <p className="text-lg font-semibold text-red-600">
                    No products detected
                  </p>
                </div>
              ) : (
                <>

                  <div className="mt-6 overflow-x-auto">

                    <table className="w-full border-collapse overflow-hidden rounded-xl">

                      <thead>

                        <tr className="bg-green-100">

                          <th className="border p-4 text-left text-black">
                            Qty
                          </th>

                          <th className="border p-4 text-left text-black">
                            Product
                          </th>

                          <th className="border p-4 text-left text-black">
                            Unit Price
                          </th>

                          <th className="border p-4 text-left text-black">
                            Total
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {result.map(
                          (
                            item,
                            index
                          ) => (
                            <tr
                              key={
                                index
                              }
                              className="hover:bg-gray-50"
                            >

                              <td className="border p-4 text-black">
                                {
                                  item.quantity
                                }
                              </td>

                              <td className="border p-4 font-semibold text-black">
                                {
                                  item.product_name
                                }
                              </td>

                              <td className="border p-4 text-black">
                                ₹
                                {
                                  item.price
                                }
                              </td>

                              <td className="border p-4 font-semibold text-green-700">
                                ₹
                                {item.price *
                                  item.quantity}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                  <div className="mt-8 rounded-xl bg-green-50 p-5">

                    <div className="flex justify-between">

                      <span className="text-2xl font-bold text-black">
                        Grand Total
                      </span>

                      <span className="text-3xl font-extrabold text-green-700">
                        ₹{total}
                      </span>

                    </div>

                  </div>

                  <div className="mt-6 flex gap-4">

                    <button
                      onClick={
                        handleCheckout
                      }
                      className="flex-1 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
                    >
                      ✅ Checkout
                    </button>

                    <button
                      onClick={
                        clearCart
                      }
                      className="flex-1 rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700"
                    >
                      🗑 Clear Cart
                    </button>

                  </div>

                </>
              )}

            </motion.div>
                        {showReceipt && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="mt-6 rounded-2xl bg-white p-6 shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-3xl font-bold text-green-700">
                    🧾 Receipt
                  </h2>

                  <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                    Paid
                  </span>

                </div>

                <div className="mt-4">

                  <p className="text-lg font-semibold text-black">
                    Receipt #{receiptNumber - 1}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {new Date().toLocaleString()}
                  </p>

                </div>

                <div className="mt-4 rounded-xl bg-green-50 p-4">

                  <span className="font-bold text-green-700">
                    ✅ Payment Successful
                  </span>

                </div>

                <hr className="my-5" />

                <div className="space-y-3">

                  {receipt.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="flex justify-between"
                      >

                        <span className="font-medium text-black">
                          {
                            item.product_name
                          }
                          {" "}
                          x
                          {
                            item.quantity
                          }
                        </span>

                        <span className="font-semibold text-black">
                          ₹
                          {item.price *
                            item.quantity}
                        </span>

                      </div>
                    )
                  )}

                </div>

                <hr className="my-5" />

                <div className="flex justify-between">

                  <span className="text-2xl font-bold text-black">
                    Grand Total
                  </span>

                  <span className="text-3xl font-extrabold text-green-700">
                    ₹
                    {
                      receiptTotal
                    }
                  </span>

                </div>

              </motion.div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}