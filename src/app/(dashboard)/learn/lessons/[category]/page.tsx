import CategoryClient from "../_component/categoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return <CategoryClient params={{ category }} />;
}
