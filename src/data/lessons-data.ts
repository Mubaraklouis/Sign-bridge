// This is the Lessons Category
export const categories = {
  beginner: {
    title: "Beginner Lessons",
    description:
      "Start your sign language journey with these foundational lessons",
    color: "bg-green-100 text-green-800",
    lessons: [
      {
        id: "alphabet",
        title: "The Sign Language Alphabet",
        description:
          "Learn to fingerspell the alphabet, the foundation of sign language",
        image: "/sign_alphabet.webp",
        duration: "20 min",
        level: "Beginner",
      },
      {
        id: "greetings",
        title: "Basic Greetings",
        description:
          "Learn common greetings and introductions in sign language",
        image: "/basic_signs.webp",
        duration: "15 min",
        level: "Beginner",
      },
      {
        id: "numbers",
        title: "Numbers 1-20",
        description: "Master signing numbers from 1 to 20",
        image: "/numbers.webp",
        duration: "25 min",
        level: "Beginner",
      },
      {
        id: "family",
        title: "Family Signs",
        description: "Learn signs for family members and relationships",
        image: "/family.webp",
        duration: "30 min",
        level: "Beginner",
      },
    ],
  },
  intermediate: {
    title: "Intermediate Lessons",
    description:
      "Build on your foundation with more complex signs and conversations",
    color: "bg-blue-100 text-blue-800",
    lessons: [
      {
        id: "conversations",
        title: "Basic Conversations",
        description: "Practice common conversational phrases and responses",
        image: "/basic.webp",
        duration: "35 min",
        level: "Intermediate",
      },
      {
        id: "emotions",
        title: "Expressing Emotions",
        description:
          "Learn to express feelings and emotions through sign language",
        image: "/emotion.webp",
        duration: "25 min",
        level: "Intermediate",
      },
      {
        id: "questions",
        title: "Asking Questions",
        description:
          "Master the techniques for forming questions in sign language",
        image: "/question.webp",
        duration: "30 min",
        level: "Intermediate",
      },
    ],
  },
  advanced: {
    title: "Advanced Lessons",
    description:
      "Master advanced concepts, idioms, and fluent signing techniques",
    color: "bg-purple-100 text-purple-800",
    lessons: [
      {
        id: "storytelling",
        title: "Storytelling Techniques",
        description: "Learn advanced narrative techniques in sign language",
        image: "/story_telling.webp",
        duration: "45 min",
        level: "Advanced",
      },
      {
        id: "idioms",
        title: "Sign Language Idioms",
        description: "Understand and use common idioms and expressions",
        image: "/idoms.webp",
        duration: "40 min",
        level: "Advanced",
      },
    ],
  },
  specialized: {
    title: "Specialized Topics",
    description:
      "Learn specialized vocabulary for specific contexts and situations",
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
        description:
          "Signs commonly used in classroom and educational settings",
        image: "/placeholder.svg?height=150&width=250",
        duration: "35 min",
        level: "Specialized",
      },
    ],
  },
};
