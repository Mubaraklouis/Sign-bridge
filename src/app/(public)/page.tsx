import Hero from "@/components/home/hero";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Hero />
      <h1>Home Page will be work on later </h1>
      <Link href="/text-to-speech">Link to text to speech</Link>
    </>
  );
};

export default HomePage;
