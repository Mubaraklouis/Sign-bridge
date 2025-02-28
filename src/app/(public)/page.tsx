import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import NewsLetter from "@/components/home/newslatter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <NewsLetter />
    </>
  );
};

export default HomePage;
