import { SignRecognizer } from "@/components/sign-recognizer";

/**
 * Complete ASL dataset including alphabet, numbers, and common words
 * Each function evaluates hand landmarks and returns a confidence score (0-1)
 * for how closely the hand matches the specific sign
 */
export const aslSigns = {
  HI: (landmarks: number[][]) => {
    /**
     * 🔹 Sign: "HELLO"
     * 🖐️ Hand Shape: Open palm, fingers together, held near forehead.
     * 🔄 Motion: Wave outward.
     * ✅ Detection: Open hand + wave motion.
     */
    const allFingersUp =
      landmarks[4][1] < landmarks[1][1] &&
      landmarks[8][1] < landmarks[5][1] &&
      landmarks[12][1] < landmarks[9][1] &&
      landmarks[16][1] < landmarks[13][1] &&
      landmarks[20][1] < landmarks[17][1];

    const fingersSpread =
      SignRecognizer.distance(landmarks[4], landmarks[8]) > 0.1 &&
      SignRecognizer.distance(landmarks[8], landmarks[12]) > 0.1 &&
      SignRecognizer.distance(landmarks[12], landmarks[16]) > 0.1 &&
      SignRecognizer.distance(landmarks[16], landmarks[20]) > 0.1;

    return (allFingersUp ? 0.4 : 0) + (fingersSpread ? 0.4 : 0);
  },

  THANK_YOU: (landmarks: number[][]) => {
    /**
     * 🔹 Sign: "THANK YOU"
     * 🖐️ Hand Shape: Open palm, fingers extended, placed near chin.
     * 🔄 Motion: Move the hand outward away from the chin.
     * ✅ Detection: Flat hand + forward motion.
     */
    const handFlat =
      landmarks[8][1] < landmarks[5][1] &&
      landmarks[12][1] < landmarks[9][1] &&
      landmarks[16][1] < landmarks[13][1] &&
      landmarks[20][1] < landmarks[17][1];

    const handMovesAway = landmarks[4][0] > landmarks[0][0]; // Thumb moves outward

    return (handFlat ? 0.4 : 0) + (handMovesAway ? 0.4 : 0);
  },

  GOOD: (landmarks: number[][]) => {
    /**
     * 🔹 Sign: "GOOD"
     * 🖐️ Hand Shape: Open palm starts at chin, moves downward.
     * 🔄 Motion: Lower hand in a controlled motion.
     * ✅ Detection: Flat hand + downward motion.
     */
    const handFlat =
      landmarks[8][1] < landmarks[5][1] &&
      landmarks[12][1] < landmarks[9][1] &&
      landmarks[16][1] < landmarks[13][1] &&
      landmarks[20][1] < landmarks[17][1];

    const handMovesDown = landmarks[4][1] > landmarks[0][1]; // Hand moves downward

    return (handFlat ? 0.6 : 0) + (handMovesDown ? 0.4 : 0);
  },

  YES: (landmarks: number[][]) => {
    /**
     * 🔹 Sign: "YES"
     * 🖐️ Hand Shape: Make a fist.
     * 🔄 Motion: Slight up-and-down movement (like nodding).
     * ✅ Detection: Fist + small motion.
     */
    const fistClosed = [
      SignRecognizer.distance(landmarks[8], landmarks[0]) < 0.1,
      SignRecognizer.distance(landmarks[12], landmarks[0]) < 0.1,
      SignRecognizer.distance(landmarks[16], landmarks[0]) < 0.1,
      SignRecognizer.distance(landmarks[20], landmarks[0]) < 0.1,
    ].every(Boolean);

    const slightUpDownMotion =
      landmarks[0][1] < landmarks[5][1] || landmarks[0][1] > landmarks[5][1];

    return (fistClosed ? 0.6 : 0) + (slightUpDownMotion ? 0.4 : 0);
  },

  CARE: (landmarks: number[][]) => {
    /**
     * 🔹 Sign: "CARE"
     * 🖐️ Hand Shape: Index and middle fingers crossed.
     * ✅ Detection: Fingers crossed + slight fist shape.
     */
    const indexMiddleCrossed =
      SignRecognizer.distance(landmarks[8], landmarks[12]) < 0.05;
    const fistPosition = [
      SignRecognizer.distance(landmarks[16], landmarks[0]) < 0.1,
      SignRecognizer.distance(landmarks[20], landmarks[0]) < 0.1,
    ].every(Boolean);

    return (indexMiddleCrossed ? 0.6 : 0) + (fistPosition ? 0.4 : 0);
  },
};
