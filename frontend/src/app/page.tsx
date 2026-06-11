"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white">

      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-orange-500 px-6 text-center text-white">

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold"
        >
          🛒 Smart Retail Checkout
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-3xl text-xl"
        >
          AI-Powered Autonomous Retail Intelligence Platform
          built using YOLOv8, FastAPI, Next.js and Computer Vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/scan"
            className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-green-700 shadow-lg transition hover:scale-105"
          >
            Launch Scanner →
          </Link>
        </motion.div>

      </section>

      <section className="px-8 py-24">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-bold"
        >
          Platform Features
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold">
              📷 Live Detection
            </h3>

            <p className="mt-4 text-gray-600">
              Real-time product detection using custom
              trained YOLOv8 models.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold">
              🧠 AI Intelligence
            </h3>

            <p className="mt-4 text-gray-600">
              Deep learning powered product recognition
              and retail automation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold">
              🛒 Smart Checkout
            </h3>

            <p className="mt-4 text-gray-600">
              Automatic shopping cart generation
              with quantity aggregation.
            </p>
          </motion.div>

        </div>

      </section>

      <section className="bg-gray-100 px-8 py-24">

        <h2 className="mb-16 text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between">

          <div className="rounded-xl bg-white p-6 shadow">
            📷 Camera
          </div>

          <div className="text-3xl">
            →
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            🧠 YOLOv8 AI
          </div>

          <div className="text-3xl">
            →
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            🛒 Cart
          </div>

          <div className="text-3xl">
            →
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            💳 Checkout
          </div>

        </div>

      </section>

      <section className="px-8 py-24">

        <h2 className="mb-16 text-center text-4xl font-bold">
          Platform Statistics
        </h2>

        <div className="grid gap-8 text-center md:grid-cols-4">

          <div>
            <h3 className="text-5xl font-bold text-green-700">
              91%
            </h3>

            <p className="mt-2">
              Detection Accuracy
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-700">
              2200+
            </h3>

            <p className="mt-2">
              Training Images
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-700">
              2
            </h3>

            <p className="mt-2">
              Product Classes
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-700">
              3ms
            </h3>

            <p className="mt-2">
              Inference Time
            </p>
          </div>

        </div>

      </section>

      <section className="bg-green-700 px-8 py-24 text-white">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Technology Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            Next.js
          </span>

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            FastAPI
          </span>

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            YOLOv8
          </span>

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            OpenCV
          </span>

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            PyTorch
          </span>

          <span className="rounded-full bg-white px-6 py-3 text-green-700 font-bold">
            TypeScript
          </span>

        </div>

      </section>

      <footer className="bg-black py-8 text-center text-white">

        <h3 className="text-xl font-bold">
          Built by Devarsh
        </h3>

        <p className="mt-2 text-gray-400">
          AI & Machine Learning Engineer
        </p>

      </footer>

    </main>
  );
}