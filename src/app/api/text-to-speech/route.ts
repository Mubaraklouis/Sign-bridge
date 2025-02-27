import { TextToSpeechClient } from "@google-cloud/text-to-speech";

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

const client = new TextToSpeechClient({
  credentials,
  projectId: credentials.project_id,
});

export async function POST(request: Request) {
  try {
    const { text, language, speed, pitch, gender } = await request.json();

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: language,
        ssmlGender: gender,
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: speed,
        pitch: pitch / 10, // Convert to the expected range (-20 to +20 becomes -2 to +2)
      },
    });

    const audioContent = response.audioContent;

    if (!audioContent) {
      return new Response("Failed to generate audio", { status: 500 });
    }

    return new Response(audioContent, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
