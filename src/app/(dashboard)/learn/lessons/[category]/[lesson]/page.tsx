import LessonClient from "../../_component/lesson";

// type PageProps = {
//   params: {
//     category: string;
//     lesson: string;
//   };
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

export default async function LessonPage({
  params,
}: {
  params: Promise<{ category: string; lesson: string }>;
}) {
  const { category, lesson } = await params;
  return <LessonClient params={{ category, lesson }} />;
}
