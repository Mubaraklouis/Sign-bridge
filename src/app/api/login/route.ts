import { NextResponse } from "next/server";
import axios from "axios";
import { setCookies } from "cookies-next";

export async function POST(request: Request) {
  try {
    // Extract email and password from the request body
    const res = await request.json();
    const { email, password } = res;

    // Send request to login API
    const response = await axios.post("http://localhost:4000/api/login", {
      email,
      password,
    });

    // Get the token from the response
    const token = response.data?.accessToken;

    // If token is received, set it in the cookies
    if (token) {
      setCookies("token", token, { req: request, res: NextResponse });

      // Return success response
      return NextResponse.json(
        { message: "Token received and stored in cookies" },
        { status: 201 }
      );
    } else {
      // Return error if token is not received
      return NextResponse.json(
        { error: "Token not found in the response" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Log error and return a failure response
    console.log("Error during login process:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
