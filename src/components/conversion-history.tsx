"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Trash2, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ConversionItem {
  id: string;
  text: string;
  type: "tts" | "stt";
  language: string;
  timestamp: number;
  isFavorite: boolean;
  audioUrl?: string;
}

export function ConversionHistory() {
  const [history, setHistory] = useState<ConversionItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("conversionHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  }, [history]);

  const toggleFavorite = (id: string) => {
    setHistory(
      history.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Conversion History</CardTitle>
          <CardDescription>Your recent conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No conversions yet
              </p>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">
                            {item.type === "tts"
                              ? "Text to Speech"
                              : "Speech to Text"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-2">{item.text}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(item.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              item.isFavorite
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            downloadText(item.text, `conversion-${item.id}.txt`)
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
