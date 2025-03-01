import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Award, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage({ params }: { params: { category: string } }) {
  // This would come from a database in a real application
  const categories = {
    beginner: {
      title: "Beginner Lessons",
      description: "Start your sign language journey with these foundational lessons",
      color: "bg-green-100 text-green-800",
      lessons: [
        {
          id: "alphabet",
          title: "The Sign Language Alphabet",
          description: "Learn to fingerspell the alphabet, the foundation of sign language",
          image: "/placeholder.svg?height=150&width=250",
          duration: "20 min",
          level: "Beginner",
        },
        {
          id: "greetings",
          title: "Basic Greetings",
          description: "Learn common greetings and introductions in sign language",
          image: "/placeholder.svg?height=150&width=250",
          duration: "15 min",
          level: "Beginner",
        },
        {
          id: "numbers",
          title: "Numbers 1-20",
          description: "Master signing numbers from 1 to 20",
          image: "/placeholder.svg?height=150&width=250",
          duration: "25 min",
          level: "Beginner",
        },
        {
          id: "family",
          title: "Family Signs",
          description: "Learn signs for family members and relationships",
          image: "/placeholder.svg?height=150&width=250",
          duration: "30 min",
          level: "Beginner",
        },
      ],
    },
    intermediate: {
      title: "Intermediate Lessons",
      description: "Build on your foundation with more complex signs and conversations",
      color: "bg-blue-100 text-blue-800",
      lessons: [
        {
          id: "conversations",
          title: "Basic Conversations",
          description: "Practice common conversational phrases and responses",
          image: "/placeholder.svg?height=150&width=250",
          duration: "35 min",
          level: "Intermediate",
        },
        {
          id: "emotions",
          title: "Expressing Emotions",
          description: "Learn to express feelings and emotions through sign language",
          image: "/placeholder.svg?height=150&width=250",
          duration: "25 min",
          level: "Intermediate",
        },
        {
          id: "questions",
          title: "Asking Questions",
          description: "Master the techniques for forming questions in sign language",
          image: "/placeholder.svg?height=150&width=250",
          duration: "30 min",
          level: "Intermediate",
        },
      ],
    },
    advanced: {
      title: "Advanced Lessons",
      description: "Master advanced concepts, idioms, and fluent signing techniques",
      color: "bg-purple-100 text-purple-800",
      lessons: [
        {
          id: "storytelling",
          title: "Storytelling Techniques",
          description: "Learn advanced narrative techniques in sign language",
          image: "/placeholder.svg?height=150&width=250",
          duration: "45 min",
          level: "Advanced",
        },
        {
          id: "idioms",
          title: "Sign Language Idioms",
          description: "Understand and use common idioms and expressions",
          image: "/placeholder.svg?height=150&width=250",
          duration: "40 min",
          level: "Advanced",
        },
      ],
    },
    specialized: {
      title: "Specialized Topics",
      description: "Learn specialized vocabulary for specific contexts and situations",
      color: "bg-orange-100 text-orange-800",
      lessons: [
        {
          id: "medical",
          title: "Medical Terminology",
          description: "Essential signs for healthcare and medical situations",
          image: "/placeholder.svg?height=150&width=250",
          duration: "50 min",
          level: "Specialized",
        },
        {
          id: "education",
          title: "Educational Terms",
          description: "Signs commonly used in classroom and educational settings",
          image: "/placeholder.svg?height=150&width=250",
          duration: "35 min",
          level: "Specialized",
        },
      ],
    },
  }

  const category = categories[params.category as keyof typeof categories]

  if (!category) {
    return <div className="container py-10">Category not found</div>
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/lessons" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all lessons
        </Link>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          <Badge className={category.color}>{params.category.charAt(0).toUpperCase() + params.category.slice(1)}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden flex flex-col">
            <div className="relative h-[150px] w-full">
              <Image src={lesson.image || "/placeholder.svg"} alt={lesson.title} fill className="object-cover" />
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
              <Button asChild className="w-full">
                <Link href={`/lessons/${params.category}/${lesson.id}`}>Start Lesson</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

