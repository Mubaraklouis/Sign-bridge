export const lessonData = {
  title: "The Sign Language Alphabet",
  description:
    "Learn to fingerspell the alphabet, the foundation of sign language",
  videoUrl: "/sign_alphabet.webp",
  sections: [
    {
      id: "intro",
      title: "Introduction to Fingerspelling",
      content:
        "Fingerspelling is a way of spelling words using hand signals that correspond to the letters of the alphabet. It's an important part of sign language that helps you spell out names, places, or words that don't have a specific sign.",
    },
    {
      id: "a-g",
      title: "Letters A-G",
      content:
        "Let's start with the first seven letters of the alphabet. Watch the video demonstration carefully and practice each hand position.",
    },
    {
      id: "h-n",
      title: "Letters H-N",
      content:
        "Now let's continue with the next seven letters. Pay attention to the position of your fingers and hand orientation.",
    },
    {
      id: "o-u",
      title: "Letters O-U",
      content:
        "These letters involve more finger movement. Practice slowly at first to ensure accuracy.",
    },
    {
      id: "v-z",
      title: "Letters V-Z",
      content:
        "The final set of letters completes the alphabet. Some of these are more complex, so take your time to master them.",
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "Which finger is extended in the sign for the letter 'D'?",
      options: ["Index finger", "Middle finger", "Ring finger", "Pinky finger"],
      correctAnswer: 0,
    },
    {
      id: "q2",
      question: "What shape does your hand make for the letter 'C'?",
      options: [
        "Closed fist",
        "Curved hand",
        "Flat hand with thumb tucked",
        "V shape",
      ],
      correctAnswer: 1,
    },
    {
      id: "q3",
      question: "How many fingers are extended for the letter 'W'?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
  ],
  practice: [
    {
      id: "p1",
      word: "HELLO",
      hint: "A common greeting",
      example: "/hello.jpeg",
    },
    {
      id: "p2",
      word: "Emotion",
      hint: "A feeling or mood",
      example: "/emotion.webp",
    },
    {
      id: "p3",
      word: "THANK YOU",
      hint: "Expressing gratitude",
      example: "/images/thankyou.jpg",
    },
  ],
};
