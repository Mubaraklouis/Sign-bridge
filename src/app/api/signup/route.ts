import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, password } = body;

  console.log(fullName, email, password);

  try {
    const response = await axios.post(
      "https://91b1-196-12-151-106.ngrok-free.app/api/register",
      {
        username: fullName,
        email,
        password,
      }
    );
    const data = await response.data;
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error sending data", error.message);
    } else {
      console.log("error", error);
    }
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
