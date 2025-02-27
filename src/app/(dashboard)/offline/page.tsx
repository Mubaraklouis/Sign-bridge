import { FeatureCard } from "@/components/feature-card";
import { Globe, Smartphone, MessageSquare, Mic } from "lucide-react";

const OffLinePage = () => {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-12 md:mb-20 pb-10 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Offline mode is Coming Soon
          </h1>
          <p className="text-gray-400">
            You can now translate text to sign and sign to text without an
            internet connection
          </p>
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="dark:bg-[#22262b] shadow-lg border p-6 rounded-lg">
              <Globe className="mb-4" size={24} />
              <h3 className="font-semibold mb-2">Download the app</h3>
              <p className="text-gray-400 text-sm">
                Download Signly from the App Store or Google Play
              </p>
            </div>
            <div className="dark:bg-[#22262b] shadow-lg border p-6 rounded-lg">
              <Smartphone className="mb-4" size={24} />
              <h3 className="font-semibold mb-2">Use offline</h3>
              <p className="text-gray-400 text-sm">
                Once the app is installed, you can use the text-to-sign and
                speech-to-text features without an internet connection
              </p>
            </div>
          </div>
        </div>
        <section>
          <h2 className="text-xl font-semibold mb-6">
            Features available in offline mode
          </h2>
          <div className="space-y-6">
            <FeatureCard
              icon={MessageSquare}
              title="Text to sign"
              description="Type a message and have it translated into American Sign Language (ASL)"
            />
            <FeatureCard
              icon={Mic}
              title="Speech to text"
              description="Speak a phrase and have it transcribed into text"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default OffLinePage;
