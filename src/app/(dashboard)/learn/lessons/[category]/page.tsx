"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Award, Video } from "lucide-react";

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
import { useRouter } from "next/navigation";
import { categories } from "@/data/lessons-data";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const router = useRouter();

  const category = categories[params.category as keyof typeof categories];

  if (!category) {
    return <div className="container py-10">Category not found</div>;
  }

  return (
    <div className="container py-10 mx-auto px-2 mb-20">
      <div className="mb-6">
        <span
          className="flex cursor-pointer items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all lessons
        </span>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {category.title}
            </h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          <Badge className={category.color}>
            {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden flex flex-col">
            <div className="relative h-[150px] w-full">
              <Image
                src={lesson.image || "/placeholder.svg"}
                alt={lesson.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="bg-background/80">
                  <Clock className="mr-1 h-3 w-3" /> {lesson.duration}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>{lesson.level}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Video className="h-4 w-4" />
                <span>Video lesson with practice exercises</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-primary_main hover:bg-primary_main"
              >
                <Link href={`/learn/lessons/${params.category}/${lesson.id}`}>
                  Start Lesson
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
