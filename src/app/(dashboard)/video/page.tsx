"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { ASLTranslator } from "@/components/asl-translator";
import toast from "react-hot-toast";
export default function VideoCallPage() {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [detectionQuality, setDetectionQuality] = useState<
    "good" | "medium" | "poor"
  >("medium");

  const handleTranslation = (text: string) => {
    if (text && text !== translatedText) {
      setTranslatedText(text);

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

  console.log(toggleWebcam);

  const handleSubscribe = () => {
    toast.success("Subscribed to a premium plan to unlock video call");
  };

  return (
    <div className="flex flex-col min-h-screen mb-20">
      <main className="container flex-1 py-6 mx-auto px-2 lg:px-44 md:px-20">
        <div className="grid gap-6  grid-cols-1">
          <div className="w-full">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {isWebcamActive ? (
                  <ASLTranslator onTranslation={handleTranslation} />
                ) : (
                  <div className="flex items-center justify-center bg-muted aspect-video">
                    Satrt a Video Call with your friend
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                {/* <Button
                  variant={isWebcamActive ? "destructive" : "default"}
                  onClick={toggleWebcam}
                  className={
                    isWebcamActive
                      ? "bg-destructive hover:bg-destructive hover:opacity-75"
                      : "bg-primary_main hover:bg-primary_main hover:opacity-75 text-white"
                  }
                >
                  {isWebcamActive ? (
                    <>
                      <CameraOff className="w-4 h-4 mr-2" />
                      End Call
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Start Call
                    </>
                  )}
                </Button> */}
                <Button
                  variant={isWebcamActive ? "destructive" : "default"}
                  onClick={handleSubscribe}
                  className={
                    isWebcamActive
                      ? "bg-destructive hover:bg-destructive hover:opacity-75"
                      : "bg-primary_main hover:bg-primary_main hover:opacity-75 text-white"
                  }
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Call
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
