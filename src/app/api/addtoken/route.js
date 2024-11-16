import User from "@/models/user";
import { authOptions } from "@/utils/auth";
import { connectDB } from "@/utils/connect";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const POST = async () => {
  const session = await getServerSession(authOptions);
  if (!session && !session?.user) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while generating data",
      }),
      {
        status: 500,
      }
    );
  }
  try {
    await connectDB();
    const email = session.user.email;
    const user = await User.findOneAndUpdate(
      { email },
      {
        $inc: { availableTokens: 10 },
      },
      { new: true, upsert: true } // Return updated doc, create if not found
    );

    return new NextResponse(
      JSON.stringify({ message: "User profile updated", user }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
    });
  }
};
