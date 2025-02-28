import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const res = await request.json();
  const { fullName, email, password } = res;

  try {
    const response = await axios.post("https://api.example.com/signup", {
      username: fullName,
      email,
      password,
    });
    const data = await response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
