"use client";

import { useEffect, useRef } from "react";

interface CameraFeedProps {
  onCapture: (file: File) => void;
}

export default function CameraFeed({
  onCapture,
}: CameraFeedProps) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    async function startCamera() {
      try {
        stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
            }
          );

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }

        // Wait a little before first capture
        setTimeout(() => {
          captureImage();
        }, 1500);

        // Capture every second
        const interval =
          setInterval(() => {
            captureImage();
          }, 1000);

        return () => {
          clearInterval(interval);

          stream
            ?.getTracks()
            .forEach((track) =>
              track.stop()
            );
        };
      } catch (error) {
        console.error(error);
      }
    }

    const cleanupPromise =
      startCamera();

    return () => {
      cleanupPromise.then(
        (cleanup) => {
          if (cleanup) cleanup();
        }
      );
    };
  }, []);

  const captureImage = () => {
    if (
      !videoRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    const video =
      videoRef.current;
    const canvas =
      canvasRef.current;

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return;
    }

    canvas.width =
      video.videoWidth;
    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File(
          [blob],
          "camera_capture.png",
          {
            type: "image/png",
          }
        );

        onCapture(file);
      },
      "image/png"
    );
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-xl rounded-lg border"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </div>
  );
}