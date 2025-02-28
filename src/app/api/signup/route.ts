import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  console.log(username, email, password);

  try {
    const response = await axios.post("http://localhost:4000/api/register", {
      username,
      email,
      password,
    });
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
