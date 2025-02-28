"use client"

/**
 * VisualFeedback
 * Handles visual rendering and effects for hand detection
 */
export const VisualFeedback = {
  /**
   * Draw hand landmarks with visual indicators
   * @param ctx Canvas context
   * @param landmarks Hand landmarks
   * @param width Canvas width
   * @param height Canvas height
   * @param color Base color for drawing
   */
  drawHand: (ctx: CanvasRenderingContext2D, landmarks: number[][], width: number, height: number, color = "red") => {
    // Draw landmarks
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y] = landmarks[i]

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = i === 0 ? "#00ff00" : color // Palm base is green
      ctx.fill()
    }

    // Draw connections between landmarks
    const connections = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4], // thumb
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8], // index finger
      [0, 9],
      [9, 10],
      [10, 11],
      [11, 12], // middle finger
      [0, 13],
      [13, 14],
      [14, 15],
      [15, 16], // ring finger
      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20], // pinky
    ]

    for (const [i, j] of connections) {
      const [x1, y1] = landmarks[i]
      const [x2, y2] = landmarks[j]

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw palm center with indicator
    const [palmX, palmY] = landmarks[0]
    ctx.beginPath()
    ctx.arc(palmX, palmY, 10, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
    ctx.fill()
  },

  /**
   * Add visual effect when a sign is successfully detected
   * @param ctx Canvas context
   * @param sign Detected sign
   * @param confidence Detection confidence
   * @param width Canvas width
   * @param height Canvas height
   */
  addDetectionEffect: (
    ctx: CanvasRenderingContext2D,
    sign: string,
    confidence: number,
    width: number,
    height: number,
  ) => {
    // Draw a pulse effect
    ctx.save()
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 50, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(75, 192, 192, 0.2)"
    ctx.fill()
    ctx.strokeStyle = "rgba(75, 192, 192, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw the sign text
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "rgba(75, 192, 192, 1)"
    ctx.textAlign = "center"
    ctx.fillText(sign, width / 2, height / 2 + 8)

    // Draw confidence
    ctx.font = "16px Arial"
    ctx.fillText(`${Math.round(confidence * 100)}%`, width / 2, height / 2 + 30)
    ctx.restore()
  },

  /**
   * Get color based on confidence level
   * @param confidence Detection confidence (0-1)
   * @returns Color string
   */
  getConfidenceColor: (confidence: number): string => {
    if (confidence < 0.5) return "red"
    if (confidence < 0.7) return "orange"
    if (confidence < 0.9) return "yellow"
    return "green"
  },
}

