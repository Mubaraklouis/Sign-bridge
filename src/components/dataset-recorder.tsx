"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

/**
 * Interface for DatasetRecorder component props
 */
interface DatasetRecorderProps {
  isRecording: boolean
  detectedSign: string
}

/**
 * DatasetRecorder component
 * Handles recording and exporting ASL sign datasets
 */
export function DatasetRecorder({ isRecording, detectedSign }: DatasetRecorderProps) {
  const [recordedSigns, setRecordedSigns] = useState<{ sign: string; count: number }[]>([])
  const [recordingTime, setRecordingTime] = useState(0)

  // Update recorded signs when a new sign is detected
  useEffect(() => {
    if (isRecording && detectedSign) {
      setRecordedSigns((prev) => {
        const existingSignIndex = prev.findIndex((item) => item.sign === detectedSign)

        if (existingSignIndex >= 0) {
          // Update existing sign count
          const updated = [...prev]
          updated[existingSignIndex] = {
            ...updated[existingSignIndex],
            count: updated[existingSignIndex].count + 1,
          }
          return updated
        } else {
          // Add new sign
          return [...prev, { sign: detectedSign, count: 1 }]
        }
      })
    }
  }, [isRecording, detectedSign])

  // Timer for recording duration
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Export dataset as JSON
  const exportDataset = () => {
    const dataStr = JSON.stringify(recordedSigns, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportName = `asl_dataset_${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()
  }

  return (
    <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-md max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Dataset Recording</h3>
        <div className="text-sm bg-red-500 px-2 py-1 rounded-full animate-pulse">REC {formatTime(recordingTime)}</div>
      </div>

      <div className="text-xs mb-2">Signs recorded: {recordedSigns.length}</div>

      <div className="max-h-32 overflow-y-auto mb-2">
        {recordedSigns.map((item, index) => (
          <div key={index} className="flex justify-between text-xs py-1 border-b border-gray-700">
            <span>{item.sign}</span>
            <span>{item.count} samples</span>
          </div>
        ))}
      </div>

      <Button size="sm" className="w-full mt-2 flex items-center justify-center gap-2" onClick={exportDataset}>
        <Download size={16} />
        Export Dataset
      </Button>
    </div>
  )
}

