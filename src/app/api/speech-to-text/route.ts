import { SpeechClient } from "@google-cloud/speech";

// Parse the credentials from the environment variable
// const credentials = {
//   type: "service_account",
//   project_id: "your-project-id",
//   private_key: process.env.GOOGLE_CLOUD_API_KEY?.replace(/\\n/g, "\n"),
//   client_email: "your-service-account@your-project.iam.gserviceaccount.com",
//   client_id: "",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "",
//   universe_domain: "googleapis.com",
// };

const credentials = {
  type: "service_account",
  project_id: "adroit-groove-451809-f8",
  private_key: process.env.GOOGLE_CLOUD_API_KEY?.replace(/\\n/g, "\n"),
  client_email:
    "text-to-speech@adroit-groove-451809-f8.iam.gserviceaccount.com",
  client_id: "111402474603808154315",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/text-to-speech%40adroit-groove-451809-f8.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const client = new SpeechClient({
  credentials,
  projectId: credentials.project_id,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const language = formData.get("language") as string;

    if (!audioFile) {
      return new Response("No audio file provided", { status: 400 });
    }

    const audioBuffer = await audioFile.arrayBuffer();

    const [response] = await client.recognize({
      audio: {
        content: Buffer.from(audioBuffer).toString("base64"),
      },
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: language,
      },
    });

    const transcription = response.results
      ?.map((result) => result.alternatives?.[0]?.transcript)
      .join("\n");

    if (!transcription) {
      return new Response("No transcription generated", { status: 500 });
    }

    return Response.json({ text: transcription });
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
