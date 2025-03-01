"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Play,
  PauseCircle,
  Volume2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { lessonData } from "@/data/lessons-data-2";

type LessonClientProps = {
  params: {
    category: string;
    lesson: string;
  };
};

export default function LessonClient({ params }: LessonClientProps) {
  const [activeTab, setActiveTab] = useState("learn");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [practiceAttempts, setPracticeAttempts] = useState<{
    [key: string]: boolean;
  }>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  //   const categoryName = params?.category
  //     ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
  //     : "Previous";

  console.log(activeTab);

  const handleVideoToggle = () => {
    setVideoPlaying(!videoPlaying);
  };

  const completeSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompletedSections = [...completedSections, sectionId];
      setCompletedSections(newCompletedSections);
      const newProgress = Math.round(
        (newCompletedSections.length / lessonData.sections.length) * 100
      );
      setProgress(newProgress);

      if (newProgress === 100) {
        setShowSuccessDialog(true);
      }
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitQuiz = () => {
    let score = 0;
    lessonData.quiz.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const markPracticeAttempt = (practiceId: string) => {
    setPracticeAttempts((prev) => ({
      ...prev,
      [practiceId]: true,
    }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const router = useRouter();

  return (
    <div className="container py-10 mx-auto px-2 mb-20">
      <div className="mb-6">
        <span
          onClick={() => router.back()}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to
          {params?.category
            ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
            : "Previous"}
          Lessons
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          {lessonData.title}
        </h1>
        <p className="text-muted-foreground">{lessonData.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="learn"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="learn" className="mt-4">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={lessonData.videoUrl || "/placeholder.svg"}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bg-background/80 hover:bg-background/90"
                    onClick={handleVideoToggle}
                  >
                    {videoPlaying ? (
                      <PauseCircle className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {lessonData.sections.map((section) => (
                  <Card key={section.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                        {completedSections.includes(section.id) && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {section.content}
                      </p>
                      <Button
                        onClick={() => completeSection(section.id)}
                        disabled={completedSections.includes(section.id)}
                        className="gap-2 bg-primary_main hover:bg-primary_main/80 text-white"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {completedSections.includes(section.id)
                          ? "Completed"
                          : "Mark as Complete"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="mt-4">
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">
                  Practice Fingerspelling
                </h2>
                <p className="mb-6">
                  Practice spelling these words using the fingerspelling
                  alphabet you just learned. Try to spell them without looking
                  at a reference.
                </p>

                <div className="space-y-6">
                  {lessonData.practice.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{item.word}</h3>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Volume2 className="h-4 w-4" />
                          Hear Word
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.hint}
                      </p>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="gap-1 mt-4">
                            <Play className="h-4 w-4" />
                            See Example
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Example: {item.word}</DialogTitle>
                            <DialogDescription>
                              Watch the demonstration and practice along
                            </DialogDescription>
                          </DialogHeader>
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={item.example || "/placeholder.svg"}
                              alt={`Example of signing ${item.word}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        className="mt-2 ml-2"
                        onClick={() => markPracticeAttempt(item.id)}
                        disabled={practiceAttempts[item.id]}
                      >
                        {practiceAttempts[item.id] ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Practiced
                          </>
                        ) : (
                          "I've Practiced This"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="mt-4">
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">
                  Test Your Knowledge
                </h2>
                <p className="mb-6">
                  Answer these questions to test your understanding of the
                  alphabet in sign language.
                </p>

                {quizSubmitted && (
                  <Alert
                    className={
                      quizScore === lessonData.quiz.length
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Quiz Results</AlertTitle>
                    <AlertDescription>
                      You scored {quizScore} out of {lessonData.quiz.length}!
                      {quizScore === lessonData.quiz.length
                        ? " Excellent work!"
                        : " Keep practicing and try again!"}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-8 mt-4">
                  {lessonData.quiz.map((question, qIndex) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4">
                        Question {qIndex + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center">
                            <input
                              type="radio"
                              id={`q${qIndex}-o${oIndex}`}
                              name={`question-${qIndex}`}
                              checked={quizAnswers[question.id] === oIndex}
                              onChange={() =>
                                handleQuizAnswer(question.id, oIndex)
                              }
                              disabled={quizSubmitted}
                              className="mr-2"
                            />
                            <label
                              htmlFor={`q${qIndex}-o${oIndex}`}
                              className={
                                quizSubmitted
                                  ? oIndex === question.correctAnswer
                                    ? "text-green-600 font-medium"
                                    : quizAnswers[question.id] === oIndex
                                    ? "text-red-600"
                                    : ""
                                  : ""
                              }
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                      {quizSubmitted &&
                        quizAnswers[question.id] !== question.correctAnswer && (
                          <p className="text-sm text-red-600 mt-2">
                            Correct answer:{" "}
                            {question.options[question.correctAnswer]}
                          </p>
                        )}
                    </div>
                  ))}

                  {!quizSubmitted ? (
                    <Button
                      onClick={submitQuiz}
                      disabled={
                        Object.keys(quizAnswers).length !==
                        lessonData.quiz.length
                      }
                      className="w-full"
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                {progress}% complete
              </p>

              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium">Lesson Navigation</h4>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Lesson
                  </Button>
                  <Button variant="outline" className="justify-between">
                    Next Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    Printable Alphabet Chart
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    Fingerspelling Practice App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    Common Fingerspelling Mistakes
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Community Discussion
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join the conversation about this lesson with other learners.
              </p>
              <Button variant="outline" className="w-full">
                View Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations! 🎉</DialogTitle>
            <DialogDescription>
              You&apos;ve completed all sections of this lesson! Would you like
              to proceed to the quiz to test your knowledge?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
            >
              Review Lesson
            </Button>
            <Button
              onClick={() => {
                setActiveTab("quiz");
                setShowSuccessDialog(false);
              }}
            >
              Take Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
