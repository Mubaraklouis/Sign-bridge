import { BookAudio, HandMetal, Plus } from "lucide-react";
import Link from "next/link";

const toolsData = [
  {
    label: "Lessons",
    icon: BookAudio,
    path: "/learn/lessons",
  },
  {
    label: "Quiz",
    icon: HandMetal,
    path: "/learn/quiz",
  },
  {
    label: "SubScribe to premium to unclock more features just for $2.00",
    icon: Plus,
    path: "#",
  },
];

const LearnSignLanguagePage = () => {
  return (
    <>
      <section className="container mt-8 px-2 md:pb-14  mx-auto ">
        <h1 className="text-3xl font-bold text-center text-white pb-12 underline">
          Learning Tools
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:px-20 md:px-8 px-2 ">
          {toolsData.map((tool, index) => (
            <Link
              href={tool.path}
              key={index}
              className="flex flex-col items-center justify-center gap-4 border-2 border-primary_main p-6 rounded-lg hover:bg-primary_main group hover:text-white cursor-pointer  text-center"
            >
              <tool.icon className="text-primary_main group-hover:text-white size-24 pb-2" />
              <h2 className="text-2xl font-semibold">{tool.label}</h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default LearnSignLanguagePage;
