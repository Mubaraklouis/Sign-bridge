import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setCookie } from "cookies-next";

export async function POST(request: NextRequest) {
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
    const user_id = response.data?.user_id;
    console.log(token); // Log token to verify it's being received

    // If token is received, set it in the cookies
    if (token) {
      const response = NextResponse.next();
      setCookie("token", token, { req: request as NextRequest, res: response });

      // Return success response
      return NextResponse.json(
        { message: "Token received and stored in cookies" },
        { status: 201 }
      );

      // Set the cookie with the token
      setCookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Set `secure: true` only in production
        path: "/",
        maxAge: 60 * 60 * 24, // Set cookie expiration (1 day)
        domain:
          process.env.NODE_ENV === "production"
            ? "yourdomain.com"
            : "localhost",
        req: request,
        res, // Pass response object to set the cookie
      });

      // Set the cookie with the token
      setCookie("user_id", user_id, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Set `secure: true` only in production
        path: "/",
        maxAge: 60 * 60 * 24, // Set cookie expiration (1 day)
        domain:
          process.env.NODE_ENV === "production"
            ? "yourdomain.com"
            : "localhost",
        req: request,
        res, // Pass response object to set the cookie
      });

      return res;
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
