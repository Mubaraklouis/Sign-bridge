"use client";

import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { HandDetector } from "./hand-detector";
import { DatasetRecorder } from "./dataset-recorder";
import { ControlPanel } from "./control-panel";

/**
 * Interface for ASL Translator component props
 */
interface ASLTranslatorProps {
  onTranslation: (text: string) => void;
}

/**
 * ASL Translator component
 * Main component that orchestrates hand detection, sign recognition, and dataset generation
 * @param onTranslation Callback function to handle translated signs
 */
export function ASLTranslator({ onTranslation }: ASLTranslatorProps) {
  // State variables for UI and detection
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelLoadingProgress, setModelLoadingProgress] = useState(0);
  const [detectedSign, setDetectedSign] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [performanceMode, setPerformanceMode] = useState(true);
  const [detectionSpeed, setDetectionSpeed] = useState(50); // ms between detections
  const [isRecording, setIsRecording] = useState(false);
  const [handMotion, setHandMotion] = useState(0);
  const [currentConfidence, setCurrentConfidence] = useState(0);

  // Reference to store the model
  const handposeModelRef = useRef<handpose.HandPose | null>(null);

  // Handle sign detection
  const handleSignDetected = (sign: string, confidence: number) => {
    setDetectedSign(sign);
    setCurrentConfidence(confidence);
    onTranslation(sign);
  };

  // Handle performance mode toggle
  const togglePerformanceMode = () => {
    setPerformanceMode(!performanceMode);
  };

  // Handle detection speed change
  const handleSpeedChange = (speed: number) => {
    setDetectionSpeed(speed);
  };

  // Handle recording toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Handle hand motion update
  const handleMotionUpdate = (motion: number) => {
    setHandMotion(motion);
  };

  // Load TensorFlow and Handpose models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsModelLoading(true);

        // Load TensorFlow.js with optimized settings
        await tf.setBackend("webgl");
        await tf.ready();
        setModelLoadingProgress(30);

        try {
          // Load Handpose model with optimized settings
          handposeModelRef.current = await handpose.load({
            detectionConfidence: 0.8,
            maxContinuousChecks: 8,
            iouThreshold: 0.7,
            scoreThreshold: 0.9,
          });

          setModelLoadingProgress(100);
          setIsModelLoading(false);
        } catch (handError) {
          console.error("Hand detection model failed to load:", handError);
          setErrorMessage(
            "Failed to load hand detection model. Please try again."
          );
          setIsModelLoading(false);
        }
      } catch (error) {
        console.error("Error loading TensorFlow:", error);
        setErrorMessage(
          "Failed to load TensorFlow. Please check your connection and try again."
        );
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, []);

  return (
    <div className="relative aspect-video">
      {isModelLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
          <div className="mb-4 text-white">
            Loading ASL Translation Models...
          </div>
          <div className="w-64 h-2 overflow-hidden bg-gray-700 rounded-full">
            <div
              className="h-full transition-all duration-300 ease-in-out bg-primary"
              style={{ width: `${modelLoadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-white">{modelLoadingProgress}%</div>
        </div>
      )}

      {errorMessage && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
          <div className="p-4 text-center text-white">
            <div className="mb-2 text-lg text-red-500">Error</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}

      {!isModelLoading && !errorMessage && handposeModelRef.current && (
        <>
          <HandDetector
            model={handposeModelRef.current}
            performanceMode={performanceMode}
            detectionSpeed={detectionSpeed}
            handMotion={handMotion}
            onSignDetected={handleSignDetected}
            onMotionUpdate={handleMotionUpdate}
            isRecording={isRecording}
          />

          <ControlPanel
            performanceMode={performanceMode}
            detectionSpeed={detectionSpeed}
            isRecording={isRecording}
            onTogglePerformanceMode={togglePerformanceMode}
            onSpeedChange={handleSpeedChange}
            onToggleRecording={toggleRecording}
            handMotion={handMotion}
            currentConfidence={currentConfidence}
          />

          {/* Render DatasetRecorder component */}
          {isRecording && (
            <DatasetRecorder
              isRecording={isRecording}
              detectedSign={detectedSign}
            />
          )}
        </>
      )}

      {detectedSign && (
        <div className="absolute px-4 py-2 text-white rounded-md bottom-4 left-4 bg-black/70">
          Detected: {detectedSign.replace("_", " ")}
        </div>
      )}
    </div>
  );
}
