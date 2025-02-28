import { Feature } from "@/types/types";
import {
  AArrowUp,
  BotMessageSquare,
  Layers2,
  //   LayoutGrid,
  Send,
  Speech,
} from "lucide-react";

const features: Feature[] = [
  {
    icon: Layers2,
    title: "Sign Language to Text",
    desc: "Easily convert sign language gestures into readable text for effective communication.",
  },
  {
    icon: AArrowUp,
    title: "Text to Speech",
    desc: "Convert text to speech for a more inclusive and accessible communication experience.",
  },
  {
    icon: Speech,
    title: "Speech to Text",
    desc: "Easily convert spoken language into readable text for effective communication.",
  },
  {
    icon: Send,
    title: "Live Chat",
    desc: "Engage in real-time conversations with others using our live chat feature.",
  },
  {
    icon: BotMessageSquare,
    title: "AI Chatbot Assistant",
    desc: "Get instant responses to your queries with our AI-powered chatbot assistant.",
  },
];

const FeatureItem = ({ feature }: { feature: Feature }) => {
  return (
    <div className="relative p-4 md:p-10">
      <div className="h-16 w-16 bg-white dark:bg-slate-800 shadow-xl flex justify-center items-center text-primary_main rounded-full text-3xl mb-6 mr-6">
        <feature.icon />
      </div>
      <div>
        <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
        <p className="opacity-70">{feature.desc}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white ">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Features
        </h2>
        <p className="mt-4 text-lg md:text-xl pb-10">
          Our application offers a wide range of features to make communication
          <br />
          more accessible and inclusive.
        </p>
      </div>
      <div className="relative overflow-hidden z-10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-1/3">
              <div className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-40 rounded-b-[200px] text-center h-full -mt-24 px-4">
                <img
                  src="https://cdn.easyfrontend.com/pictures/rose.png"
                  alt=""
                  className="rounded mx-auto "
                  width="250"
                />
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="xl:ml-6 w-full">
                <div className="grid grid-cols-2 w-full">
                  {features.map((feature, i) => (
                    <div className="col-span-2 lg:col-span-1" key={i}>
                      <FeatureItem feature={feature} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
