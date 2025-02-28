import { ArrowRightLeft, Bot, Camera } from "lucide-react";

const HowItWorks = () => {
  return (
    <>
      <section className="container py-8 md:pb-14">
        <div className="mx-auto grid max-w-5xl gap-6 lg:gap-12">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How It Works
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Our application uses cutting-edge technology to translate sign
              language in real-time.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Camera />
              </div>
              <h3 className="text-xl font-bold">Webcam Capture</h3>
              <p className="text-muted-foreground">
                The application captures your hand movements through your
                device&apos;s webcam.
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Bot />
              </div>
              <h3 className="text-xl font-bold">AI Processing</h3>
              <p className="text-muted-foreground">
                TensorFlow.js analyzes the hand gestures and identifies the
                corresponding signs.
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ArrowRightLeft />
              </div>
              <h3 className="text-xl font-bold">Text Translation</h3>
              <p className="text-muted-foreground">
                The recognized signs are converted to text and displayed on your
                screen in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
