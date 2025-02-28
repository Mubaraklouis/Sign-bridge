import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="container flex flex-col items-center px-4 py-16 pb-16 mx-auto text-center lg:pb-20 md:py-32 md:px-10 lg:px-32 dark:text-gray-50 ">
        <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
          Real-Time ASL to Text Translation
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
          Our application uses advanced machine learning to translate American
          Sign Language into text in real-time. Start using the translator by
          clicking the button below.
        </p>
        <div className="flex flex-wrap justify-center">
          <Link href="/text-to-speech">
            <button
              type="button"
              className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900 "
            >
              Start Translating
            </button>
          </Link>
          <Link href="learn">
            <button
              type="button"
              className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50"
            >
              Learn more
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
