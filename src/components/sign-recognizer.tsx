"use client";

import { aslSigns } from "@/data/alssign-data";

/**
 * SignRecognizer
 * Handles sign recognition from hand landmarks
 */
export const SignRecognizer = {
  /**
   * Recognize iterates over each sign and selects the one with the highest confidence.
   * @param landmarks Hand landmarks from handpose model
   * @returns Object with detected sign and confidence
   */
  recognizeSign: (
    landmarks: number[][]
  ): { sign: string; confidence: number } => {
    // Normalize landmarks for consistent gesture recognition
    const normalizedLandmarks = SignRecognizer.normalizeLandmarks(landmarks);

    // Recognize gesture
    let bestSign = "Unknown";
    let bestConfidence = 0;

    // Check each sign
    Object.entries(aslSigns).forEach(([sign, evaluator]) => {
      const confidence = evaluator(normalizedLandmarks);
      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        bestSign = sign;
      }
    });

    if (bestConfidence < 0.5) {
      return { sign: "Sign not detected", confidence: 0 };
    }

    return { sign: bestSign, confidence: bestConfidence };
  },

  /**
   * Normalize landmarks relative to the hand size
   * @param landmarks Array of hand landmark points
   * @returns Normalized landmarks in 0-1 range
   */
  normalizeLandmarks: (landmarks: number[][]): number[][] => {
    // Find the bounding box
    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY;
    let minZ = Number.POSITIVE_INFINITY,
      maxZ = Number.NEGATIVE_INFINITY;

    for (const point of landmarks) {
      minX = Math.min(minX, point[0]);
      maxX = Math.max(maxX, point[0]);
      minY = Math.min(minY, point[1]);
      maxY = Math.max(maxY, point[1]);
      minZ = Math.min(minZ, point[2]);
      maxZ = Math.max(maxZ, point[2]);
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const depth = maxZ - minZ;
    const maxDimension = Math.max(width, height, depth);

    // Normalize points to 0-1 range
    return landmarks.map((point) => [
      (point[0] - minX) / maxDimension,
      (point[1] - minY) / maxDimension,
      (point[2] - minZ) / maxDimension,
    ]);
  },

  /**
   * Calculate distance between two landmarks
   */
  distance: (a: number[], b: number[]): number => {
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2)
    );
  },

  /**
   * Calculate angle between three points in degrees
   */
  angleBetween: (a: number[], b: number[], c: number[]): number => {
    const ab = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const cb = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];

    // Calculate dot product
    const dot = ab[0] * cb[0] + ab[1] * cb[1] + ab[2] * cb[2];

    // Calculate magnitudes
    const abMag = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
    const cbMag = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2]);

    // Calculate angle in radians and convert to degrees
    const angle = Math.acos(dot / (abMag * cbMag)) * (180 / Math.PI);

    return angle;
  },
};
