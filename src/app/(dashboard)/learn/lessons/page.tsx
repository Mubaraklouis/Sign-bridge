import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function LessonsPage() {
  // This would come from a database in a real application
  const categories = [
    {
      id: "beginner",
      title: "Beginner",
      description:
        "Start your sign language journey with basic signs and simple phrases",
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      lessons: 10,
      completedLessons: 0,
      color: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description:
        "Build on your foundation with more complex signs and conversations",
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      lessons: 15,
      completedLessons: 0,
      color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    {
      id: "advanced",
      title: "Advanced",
      description:
        "Master advanced concepts, idioms, and fluent signing techniques",
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      lessons: 12,
      completedLessons: 0,
      color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    },
    {
      id: "specialized",
      title: "Specialized Topics",
      description:
        "Learn specialized vocabulary for specific contexts and situations",
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      lessons: 8,
      completedLessons: 0,
      color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    },
  ];

  return (
    <div className="container py-10 mx-auto px-2 mb-20">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">
            Explore our structured curriculum designed to take you from beginner
            to advanced.
          </p>
        </div>
        <Button asChild>
          <Link href="/lessons/recommended">Recommended for You</Link>
        </Button>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative h-[200px] w-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={category.color}>{category.title}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {category.completedLessons}/{category.lessons} lessons
                </span>
              </div>
              <Progress value={category.progress} className="h-2" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/learn/lessons/${category.id}`}>
                  {category.progress > 0
                    ? "Continue Learning"
                    : "Start Learning"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
