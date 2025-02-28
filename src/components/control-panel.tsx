"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

/**
 * Interface for ControlPanel component props
 */
interface ControlPanelProps {
  performanceMode: boolean;
  detectionSpeed: number;
  isRecording: boolean;
  handMotion: number;
  currentConfidence: number;
  onTogglePerformanceMode: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleRecording: () => void;
}

/**
 * ControlPanel component
 * Provides UI controls for ASL translator settings
 */
export function ControlPanel({
  performanceMode,
  detectionSpeed,
  isRecording,
  handMotion,
  currentConfidence,
  onTogglePerformanceMode,
  onSpeedChange,
  onToggleRecording,
}: ControlPanelProps) {
  // Get color based on confidence
  const getConfidenceColor = (confidence: number): string => {
    if (confidence < 0.5) return "bg-red-500";
    if (confidence < 0.7) return "bg-orange-500";
    if (confidence < 0.9) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="absolute px-4 py-2 text-sm text-white rounded-md top-4 right-4 bg-black/70">
      <div>Detection Status:</div>
      <div className="flex items-center mt-1">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getConfidenceColor(
            currentConfidence
          )}`}
        ></div>
        <span>
          {currentConfidence < 0.5
            ? "Low"
            : currentConfidence < 0.7
            ? "Medium"
            : currentConfidence < 0.9
            ? "Good"
            : "Excellent"}
        </span>
      </div>

      <div className="flex items-center mt-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="performance-mode"
            checked={performanceMode}
            onCheckedChange={onTogglePerformanceMode}
          />
          <Label htmlFor="performance-mode">Performance Mode</Label>
        </div>
      </div>

      <div className="mt-2">
        <div className="mb-1 text-xs">Detection Speed: {detectionSpeed}ms</div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-xs text-black"
            onClick={() => onSpeedChange(Math.max(20, detectionSpeed - 10))}
          >
            Faster
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-xs text-black"
            onClick={() => onSpeedChange(Math.min(100, detectionSpeed + 10))}
          >
            Slower
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <div className="mb-1 text-xs">Hand Motion: {handMotion}/10</div>
        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
            style={{ width: `${handMotion * 10}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-3">
        <Button
          size="sm"
          variant={isRecording ? "destructive" : "default"}
          className="flex items-center justify-center w-full gap-2"
          onClick={onToggleRecording}
        >
          <Save size={16} />
          {isRecording ? "Stop Recording" : "Record Dataset"}
        </Button>
      </div>
    </div>
  );
}
