"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "./ui/progress";
import toast from "react-hot-toast";
import { LanguageSelector, type languages } from "./language-selector";
import { ConversionHistory } from "./conversion-history";
import { AudioVisualizer } from "./audio-visualizer";

const MAX_RECORDING_TIME = 300; // 5 minutes in seconds

export function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [language, setLanguage] = useState<keyof typeof languages>("en-US");
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSpeechSupported(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "NotAllowedError") {
        toast.error(
          "Please enable microphone access in your browser settings to use this feature."
        );
      }
      setHasPermission(false);
      return false;
    }
  };

  const startRecording = async () => {
    const hasAccess = await checkMicrophonePermission();
    if (!hasAccess) {
      toast.error(
        "Please enable microphone access in your browser settings to use this feature"
      );
      return;
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(newStream);
      const mediaRecorder = new MediaRecorder(newStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await convertSpeechToText(audioBlob);
        newStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "Please enable microphone access in your browser settings to use this feature."
        );
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const convertSpeechToText = async (audioBlob: Blob) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("language", language);

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert speech to text");
      }

      const { text: transcribedText } = await response.json();
      setText(transcribedText);

      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        text: transcribedText,
        type: "stt" as const,
        language,
        timestamp: Date.now(),
        isFavorite: false,
      };

      const history = JSON.parse(
        localStorage.getItem("conversionHistory") || "[]"
      );
      localStorage.setItem(
        "conversionHistory",
        JSON.stringify([historyItem, ...history])
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to convert speech to text");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to copy text to clipboard");
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isSpeechSupported) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Browser Not Supported</AlertTitle>
        <AlertDescription>
          Your browser does not support speech recognition. Please try using a
          modern browser like Chrome, Firefox, or Edge.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Speech to Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasPermission === false && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Microphone Access Required</AlertTitle>
              <AlertDescription>
                Please enable microphone access in your browser settings to use
                this feature. After enabling, refresh the page.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label>Language</Label>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          {isRecording && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Recording</Label>
                <span className="text-sm text-muted-foreground">
                  {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
                </span>
              </div>
              <Progress value={(recordingTime / MAX_RECORDING_TIME) * 100} />
              <AudioVisualizer stream={stream} isRecording={isRecording} />
            </div>
          )}

          <Textarea
            placeholder="Your transcribed text will appear here..."
            value={text}
            readOnly
            className="h-40"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading || hasPermission === false}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
          {text && (
            <Button
              variant="secondary"
              onClick={copyToClipboard}
              disabled={isLoading}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </Button>
          )}
        </CardFooter>
      </Card>

      <ConversionHistory />
    </div>
  );
}
