"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoIcon as InfoCircle } from "lucide-react";

// Define the sign data structure
interface Sign {
  word: string;
  imageUrl: string;
}

// Predefined list of common words for sign language practice with associated images
const SIGN_WORDS: Sign[] = [
  { word: "hello", imageUrl: "/images/hello.jpg" },
  { word: "thank you", imageUrl: "/images/thankyou.jpg" },
  { word: "please", imageUrl: "/images/please.jpg" },
  { word: "sorry", imageUrl: "/images/sorry.jpg" },
  { word: "yes", imageUrl: "/images/yes.jpg" },
  { word: "no", imageUrl: "/images/no.jpg" },
  { word: "help", imageUrl: "/images/help.png" },
  { word: "eat", imageUrl: "/images/eat.png" },
  { word: "drink", imageUrl: "/images/drink.png" },

  // alphabets
  { word: "a", imageUrl: "/images/alphabet/a.png" },
  { word: "b", imageUrl: "/images/alphabet/b.png" },
  { word: "c", imageUrl: "/images/alphabet/c.png" },
  { word: "d", imageUrl: "/images/alphabet/d.png" },
  { word: "e", imageUrl: "/images/alphabet/e.png" },
  { word: "f", imageUrl: "/images/alphabet/f.png" },
  { word: "g", imageUrl: "/images/alphabet/g.png" },
  { word: "h", imageUrl: "/images/alphabet/h.png" },
  { word: "i", imageUrl: "/images/alphabet/i.png" },
  { word: "j", imageUrl: "/images/alphabet/j.png" },
  { word: "k", imageUrl: "/images/alphabet/k.png" },
  { word: "l", imageUrl: "/images/alphabet/l.png" },
  { word: "m", imageUrl: "/images/alphabet/m.png" },
  { word: "n", imageUrl: "/images/alphabet/n.png" },
  { word: "o", imageUrl: "/images/alphabet/o.png" },
  // { word: "p", imageUrl: "/images/alphabet/p.png" },
  // { word: "q", imageUrl: "/images/alphabet/q.png" },
  // { word: "r", imageUrl: "/images/alphabet/r.png" },
  // { word: "s", imageUrl: "/images/alphabet/s.png" },
  // { word: "t", imageUrl: "/images/alphabet/t.png" },
  // { word: "u", imageUrl: "/images/alphabet/u.png" },
  // { word: "v", imageUrl: "/images/alphabet/v.png" },
  // { word: "w", imageUrl: "/images/alphabet/w.png" },
  // { word: "x", imageUrl: "/images/alphabet/x.png" },
  // { word: "y", imageUrl: "/images/alphabet/y.png" },
  // { word: "z", imageUrl: "/images/alphabet/z.png" },

  // { word: "love", imageUrl: "/images/love.png" },
  // { word: "work", imageUrl: "/images/work.png" },
  // { word: "school", imageUrl: "/images/school.png" },
  // { word: "sleep", imageUrl: "/images/sleep.png" },
  // { word: "play", imageUrl: "/images/play.png" },
  // { word: "happy", imageUrl: "/images/happy.png" },
  // { word: "friend", imageUrl: "/images/friend.png" },
  // { word: "family", imageUrl: "/images/family.png" },
  // { word: "sad", imageUrl: "/images/sad.png" },
  // { word: "hot", imageUrl: "/images/hot.png" },
  // { word: "cold", imageUrl: "/images/cold.png" },
  // { word: "good", imageUrl: "/images/good.png" },
  // { word: "bad", imageUrl: "/images/bad.png" },
  // { word: "morning", imageUrl: "/images/morning.png" },
  // { word: "night", imageUrl: "/images/night.png" },
];

const SignQuizGame = () => {
  // Game state
  const [currentSign, setCurrentSign] = useState<Sign | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [replays, setReplays] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [letterCount, setLetterCount] = useState("any");
  const [speed, setSpeed] = useState(50);
  const [options, setOptions] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    isCorrect: boolean;
  } | null>(null);

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("signGameHighScore");
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore));
    }

    const savedIsLoggedIn = localStorage.getItem("signGameIsLoggedIn");
    if (savedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("signGameHighScore", highScore.toString());
  }, [highScore]);

  // Generate a new sign
  const generateNewSign = async () => {
    setLoading(true);
    setShowAnswer(false);
    setFeedback(null);
    setUserAnswer("");

    // Filter words based on letter count setting
    let filteredWords = [...SIGN_WORDS];
    if (letterCount === "short") {
      filteredWords = SIGN_WORDS.filter((sign) => sign.word.length <= 4);
    } else if (letterCount === "medium") {
      filteredWords = SIGN_WORDS.filter(
        (sign) => sign.word.length > 4 && sign.word.length <= 6
      );
    } else if (letterCount === "long") {
      filteredWords = SIGN_WORDS.filter((sign) => sign.word.length > 6);
    }

    // Select a random word
    const randomSign =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];

    // console.log("Randomly Selected Word:", randomSign.word); // Debugging

    setCurrentSign(randomSign);

    // Generate multiple choice options
    generateOptions(randomSign.word);
    setLoading(false);
  };

  // Generate multiple choice options
  const generateOptions = (correctWord: string) => {
    const allOptions = [correctWord];

    // Add 3 random incorrect options
    while (allOptions.length < 4) {
      const randomWord =
        SIGN_WORDS[Math.floor(Math.random() * SIGN_WORDS.length)].word;
      if (!allOptions.includes(randomWord)) {
        allOptions.push(randomWord);
      }
    }

    // Shuffle options
    setOptions(allOptions.sort(() => Math.random() - 0.5));
  };

  // Check the user's answer
  const checkAnswer = (selectedAnswer: string) => {
    if (!currentSign) return;

    // Normalize the user's answer and the correct answer
    const normalizedUserAnswer = selectedAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentSign.word.trim().toLowerCase();

    // console.log("Correct Answer:", normalizedCorrectAnswer); // Debugging
    // console.log("User Answer:", normalizedUserAnswer); // Debugging

    const isCorrect = normalizedCorrectAnswer === normalizedUserAnswer;

    // console.log("Is Correct:", isCorrect); // Debugging

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setFeedback({ message: "Correct!", isCorrect: true });
    } else {
      setFeedback({
        message: `Incorrect. The answer is "${currentSign.word}".`,
        isCorrect: false,
      });
    }

    // Automatically generate a new sign after a delay
    setTimeout(() => {
      generateNewSign();
    }, 2000);
  };

  // Handle replay
  const handleReplay = () => {
    if (replays > 0) {
      setReplays(replays - 1);
      // In a real implementation, this would replay the sign animation
    }
  };

  // Reset scores
  const resetScores = () => {
    setScore(0);
    setHighScore(0);
    localStorage.removeItem("signGameHighScore");
  };

  // Reset game
  const resetGame = () => {
    resetScores();
    setReplays(5);
    generateNewSign();
  };

  // Login to save scores
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("signGameIsLoggedIn", "true");
  };
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">
                Fingerspelling Game
              </h1>
              <button className="text-gray-500 hover:text-gray-700">
                <InfoCircle size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-gray-700">Score {score}</div>
                <div className="text-green-500">Highscore {highScore}</div>
                <div className="text-gray-500">Replays {replays}</div>
                {!isLoggedIn && (
                  <button
                    onClick={handleLogin}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Sign in before playing to save scores
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center w-48 h-48 bg-gray-100 rounded-md">
                {loading ? (
                  <p className="text-gray-500">Loading sign description...</p>
                ) : currentSign ? (
                  <div className="text-center">
                    {showAnswer && (
                      <p className="mb-2 font-bold">{currentSign.word}</p>
                    )}
                    <img
                      src={currentSign.imageUrl}
                      alt="Sign language gesture"
                      className="mx-auto max-h-40"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">Press New Word to start</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <Button
                onClick={generateNewSign}
                className="text-white bg-green-500 hover:bg-green-600"
              >
                New Word
              </Button>
              <Button
                onClick={handleReplay}
                disabled={replays <= 0 || !currentSign}
                className="text-white bg-green-500 hover:bg-green-600 disabled:opacity-50"
              >
                Replay Word
              </Button>
              <Button
                onClick={() => setShowAnswer(true)}
                disabled={!currentSign}
                className="text-white bg-green-500 hover:bg-green-600 disabled:opacity-50"
              >
                Show Answer
              </Button>
            </div>

            <Tabs defaultValue="type">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="type">Type Answer</TabsTrigger>
                <TabsTrigger value="multiple">Multiple Choice</TabsTrigger>
              </TabsList>

              <TabsContent value="type" className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={!currentSign || showAnswer}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkAnswer(userAnswer);
                      }
                    }}
                  />
                  <Button
                    onClick={() => checkAnswer(userAnswer)}
                    disabled={!userAnswer || !currentSign || showAnswer}
                    className="text-white bg-green-500 hover:bg-green-600"
                  >
                    Check
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="multiple">
                <div className="grid grid-cols-2 gap-2">
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`justify-start text-left ${
                        userAnswer === option
                          ? "border-green-500 bg-green-50"
                          : ""
                      }`}
                      onClick={() => {
                        setUserAnswer(option); // Set the user's answer to the selected option
                        checkAnswer(option); // Immediately check the answer
                      }}
                      disabled={showAnswer}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {feedback && (
              <div
                className={`mt-4 p-2 rounded ${
                  feedback.isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Number of letters:
                  </span>
                  <span className="text-sm text-gray-600">
                    {letterCount === "any"
                      ? "Any length"
                      : letterCount === "short"
                      ? "Short"
                      : letterCount === "medium"
                      ? "Medium"
                      : "Long"}
                  </span>
                </div>
                <RadioGroup
                  value={letterCount}
                  onValueChange={setLetterCount}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any" className="sr-only">
                      Any
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short" className="sr-only">
                      Short
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="sr-only">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="long" />
                    <Label htmlFor="long" className="sr-only">
                      Long
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Set your speed:</span>
                  <span className="text-sm text-gray-600">
                    {speed < 33 ? "Slow" : speed < 66 ? "Medium" : "Fast"}
                  </span>
                </div>
                <Slider
                  value={[speed]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSpeed(value[0])}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  onClick={resetScores}
                  variant="outline"
                  className="text-gray-600"
                >
                  Reset Scores
                </Button>
                <Button
                  onClick={resetGame}
                  className="text-white bg-red-500 hover:bg-red-600"
                >
                  Reset Game
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignQuizGame;
