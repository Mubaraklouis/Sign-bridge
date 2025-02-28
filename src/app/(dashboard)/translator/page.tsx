"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ASLTranslator } from "@/components/asl-translator";
import axios from "axios";
export default function TranslatorPage() {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [translationHistory, setTranslationHistory] = useState<string[]>([]);
  const [detectionQuality, setDetectionQuality] = useState<
    "good" | "medium" | "poor"
  >("medium");

  const handleTranslation = (text: string) => {
    if (text && text !== translatedText) {
      setTranslatedText(text);
      setTranslationHistory((prev) => [text, ...prev].slice(0, 10));

      // Simulate detection quality changes
      const qualities: Array<"good" | "medium" | "poor"> = [
        "good",
        "medium",
        "poor",
      ];
      const randomQuality =
        qualities[Math.floor(Math.random() * qualities.length)];
      setDetectionQuality(randomQuality);
    }
  };

  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const clearHistory = () => {
    setTranslationHistory([]);
    setTranslatedText("");
  };

  const sentChatText = async (message: string) => {
    try {
      const response = await axios.post(
        "/api/chat",
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Message: ", message);
      // console.log("Response ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending chat message:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold">ASL Translator</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <main className="container flex-1 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {isWebcamActive ? (
                  <ASLTranslator onTranslation={handleTranslation} />
                ) : (
                  <div className="flex items-center justify-center bg-muted aspect-video">
                    <Button onClick={toggleWebcam}>
                      <Camera className="w-4 h-4 mr-2" />
                      Enable Webcam
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <Button
                  variant={isWebcamActive ? "destructive" : "default"}
                  onClick={toggleWebcam}
                >
                  {isWebcamActive ? (
                    <>
                      <CameraOff className="w-4 h-4 mr-2" />
                      Disable Webcam
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Enable Webcam
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={toggleMute}>
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Mute
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      detectionQuality === "good"
                        ? "bg-green-500"
                        : detectionQuality === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    Detection Quality
                    {detectionQuality === "good"
                      ? "Good"
                      : detectionQuality === "medium"
                      ? "Medium"
                      : "Poor"}
                  </span>
                </div>
                <Button variant="outline" onClick={clearHistory}>
                  Clear History
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Tabs defaultValue="current">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="min-h-[200px]">
                      <h3 className="mb-2 text-lg font-medium">
                        Translated Text
                      </h3>
                      <div className="text-3xl font-bold">
                        {translatedText || "No translation yet"}
                      </div>
                      {translatedText ? (
                        <button
                          className="px-6 py-2 mt-4 rounded-md bg-primary"
                          onClick={() => {
                            navigator.clipboard.writeText(translatedText);
                            sentChatText(translatedText);
                            console.log(
                              "Text copied to clipboard:",
                              translatedText
                            );
                          }}
                        >
                          Send
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="min-h-[200px]">
                      <h3 className="mb-2 text-lg font-medium">
                        Translation History
                      </h3>
                      {translationHistory.length > 0 ? (
                        <ul className="space-y-2">
                          {translationHistory.map((text, index) => (
                            <li key={index} className="p-2 rounded-md bg-muted">
                              {text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          No translation history
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
