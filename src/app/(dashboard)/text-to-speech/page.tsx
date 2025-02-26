import { SpeechToText } from "@/components/speech-to-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextToSpeechPage = () => {
  return (
    <>
      <div className=" p-4 md:p-8 mb-[6rem]">
        <div className="mx-auto max-w-4xl space-y-6 ">
          <h1 className="text-3xl font-bold text-center mb-8">
            Speech Conversion Tools
          </h1>

          <Tabs defaultValue="text-to-speech" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
              <TabsTrigger value="speech-to-text">Speech to Text</TabsTrigger>
            </TabsList>
            <TabsContent value="text-to-speech">
              <h1>
                Text to Speech Component will be added here by a team member
                when he complete the feature
              </h1>
            </TabsContent>
            <TabsContent value="speech-to-text">
              <SpeechToText />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TextToSpeechPage;
