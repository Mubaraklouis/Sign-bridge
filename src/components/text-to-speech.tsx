"use client";

import { useState } from "react";
import { Mic, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector, type languages } from "./language-selector";
import { VoiceSettings } from "./voice-settings";
import { ConversionHistory } from "./conversion-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";

export function TextToSpeech() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState<keyof typeof languages>("en-US");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(100);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "NEUTRAL">(
    "NEUTRAL"
  );

  const handleTextToSpeech = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
          speed,
          pitch,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert text to speech");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      newAudio.volume = volume / 100;

      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }

      setAudio(newAudio);
      setIsPlaying(true);
      newAudio.play();
      newAudio.onended = () => setIsPlaying(false);

      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        text,
        type: "tts" as const,
        language,
        timestamp: Date.now(),
        isFavorite: false,
        audioUrl,
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
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const getWordCount = () => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text to Speech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="input" className="w-full">
            <TabsList>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="voice">Voice Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <LanguageSelector value={language} onChange={setLanguage} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="text">Enter text</Label>
                    <span className="text-sm text-muted-foreground">
                      {getWordCount()} words, {getCharacterCount()} characters
                    </span>
                  </div>
                  <Textarea
                    id="text"
                    placeholder="Type or paste text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-40"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="voice">
              <VoiceSettings
                speed={speed}
                pitch={pitch}
                volume={volume}
                gender={gender}
                onSpeedChange={setSpeed}
                onPitchChange={setPitch}
                onVolumeChange={setVolume}
                onGenderChange={setGender}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="default"
            onClick={handleTextToSpeech}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>Converting...</>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Convert to Speech
              </>
            )}
          </Button>
          {audio && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={togglePlayback}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <ConversionHistory />
    </div>
  );
}
