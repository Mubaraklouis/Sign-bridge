"use client";

import { useEffect, useRef, useCallback } from "react";
import type * as handpose from "@tensorflow-models/handpose";
import { VisualFeedback } from "./visual-feedback";
import { SignRecognizer } from "./sign-recognizer";

/**
 * Interface for HandDetector component props
 */
interface HandDetectorProps {
  model: handpose.HandPose;
  performanceMode: boolean;
  detectionSpeed: number;
  handMotion: number;
  isRecording: boolean;
  onSignDetected: (sign: string, confidence: number) => void;
  onMotionUpdate: (motion: number) => void;
}

/**
 * HandDetector component
 * Handles webcam access and hand detection
 */
export function HandDetector({
  model,
  performanceMode,
  detectionSpeed,
  handMotion,
  isRecording,
  onSignDetected,
  onMotionUpdate,
}: HandDetectorProps) {
  // References for video and canvas elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reference to store the animation frame ID
  const requestAnimationFrameRef = useRef<number | null>(null);

  // References for tracking hand position and movement
  const previousHandPositionRef = useRef<number[] | null>(null);

  // Reference for detection timing
  const lastDetectionTimeRef = useRef<number>(0);

  // Reference for recorded landmarks
  const recordedLandmarksRef = useRef<number[][][]>([]);

  /**
   * Calculate distance between two points
   */
  const distance = useCallback((a: number[], b: number[]): number => {
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2)
    );
  }, []);

  /**
   * Calculate hand motion by comparing current position with previous
   */
  const calculateHandMotion = useCallback(
    (currentPosition: number[]) => {
      if (previousHandPositionRef.current) {
        const movement = distance(
          currentPosition,
          previousHandPositionRef.current
        );
        // Scale movement to 0-10 range for reactive detection
        const scaledMovement = Math.min(10, Math.floor(movement * 100));
        onMotionUpdate(scaledMovement);
      }
      previousHandPositionRef.current = [...currentPosition];
    },
    [onMotionUpdate, distance]
  );

  /**
   * Setup webcam and start detection
   */
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const setupWebcam = async () => {
      try {
        // Request camera with appropriate resolution based on performance mode
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: performanceMode ? 320 : 640,
            height: performanceMode ? 240 : 480,
            frameRate: performanceMode ? 15 : 30,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            startDetection();
          };
        }
      } catch (mediaError) {
        console.error("Error accessing webcam:", mediaError);
      }
    };

    /**
     * Start the hand detection loop
     */
    const startDetection = () => {
      const detectFrame = async () => {
        const now = Date.now();

        // Calculate dynamic detection interval based on hand motion
        const dynamicInterval = Math.max(20, detectionSpeed - handMotion * 5);

        // Only run detection at specified intervals to improve performance
        if (now - lastDetectionTimeRef.current >= dynamicInterval) {
          lastDetectionTimeRef.current = now;

          if (videoRef.current && canvasRef.current) {
            try {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext("2d");

              if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw video frame
                ctx.drawImage(
                  videoRef.current,
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );

                // Detect hands with optimized settings
                const handPredictions = await model.estimateHands(
                  videoRef.current,
                  false
                );

                // Process hand predictions
                if (handPredictions.length > 0) {
                  // Process the first hand (most confident)
                  const landmarks = handPredictions[0].landmarks;

                  // Calculate hand motion
                  calculateHandMotion(landmarks[0]);

                  // If recording, store landmarks
                  if (isRecording) {
                    recordedLandmarksRef.current.push([...landmarks]);
                  }

                  // Draw hand landmarks with visual indicators
                  VisualFeedback.drawHand(
                    ctx,
                    landmarks,
                    canvas.width,
                    canvas.height
                  );

                  // Recognize sign
                  const { sign, confidence } =
                    SignRecognizer.recognizeSign(landmarks);

                  // If sign detected with sufficient confidence, notify parent
                  if (sign && confidence > 0.75) {
                    onSignDetected(sign, confidence);

                    // Add visual effect for detection
                    VisualFeedback.addDetectionEffect(
                      ctx,
                      sign,
                      confidence,
                      canvas.width,
                      canvas.height
                    );
                  }
                }

                // If we have both hands, draw the second hand
                if (handPredictions.length > 1) {
                  VisualFeedback.drawHand(
                    ctx,
                    handPredictions[1].landmarks,
                    canvas.width,
                    canvas.height,
                    "blue"
                  );
                }
              }
            } catch (error) {
              console.error("Error in detection:", error);
            }
          }
        }

        // Continue detection loop
        requestAnimationFrameRef.current = requestAnimationFrame(detectFrame);
      };

      detectFrame();
    };

    setupWebcam();

    return () => {
      // Cleanup
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }

      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [
    model,
    performanceMode,
    detectionSpeed,
    handMotion,
    isRecording,
    onSignDetected,
    calculateHandMotion,
  ]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 object-cover w-full h-full"
        width={performanceMode ? 320 : 640}
        height={performanceMode ? 240 : 480}
      />
    </>
  );
}
