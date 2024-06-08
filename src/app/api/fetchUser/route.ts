import { NextRequest } from "next/server";
//@ts-ignore
import clientPromise from "../../../lib/mongodb";
// Update this with the correct path

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Email parameter is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("data");
    console.log("Fetching user details");

    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "User found",
        user: user,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
