import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { connectDB } from "@/utils/connect";
import User from "@/models/user";
import Post from "@/models/post";
export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session && !session?.user) {
    JSON.stringify({ message: "Please login" }),
      {
        status: 500,
      };
  }
  try {
    const email = session.user.email;
    await connectDB();
    const userProfile = await User.findOne({
      email,
    });
    if (!userProfile?.availableTokens) {
      JSON.stringify({ message: "...." }),
        {
          status: 403,
        };
      return;
    }
    const { topic, keyword } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_kEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a short and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keyword}. The content should be formatted in SEO-friendly HTML. The response must also include appropriate HTML title and meta description content. The return format must be stringified JSON in the following format:
  {
  "postContent": post content goes here,
  "title": title goes here,
  "metaDescription": meta-description goes here
  } `;
    const newBalance = await User.findOneAndUpdate(
      {
        email,
      },
      {
        $inc: {
          availableTokens: -1,
        },
      }
    );
    const result = await model.generateContent(prompt);

    // Remove markdown-style code block markers from the message
    const cleanData = result.response.text().replace(/```json|```/g, "");

    // Parse the cleaned JSON
    const parsedData = JSON.parse(cleanData);

    const post = await Post.create({
      title: parsedData.title,
      metaDesc: parsedData.metaDescription,
      postContent: parsedData.postContent,
      topic,
      keyword,
    });
    return new NextResponse(JSON.stringify({ parsedData }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while generating data",
      }),
      {
        status: 500,
      }
    );
  }
};
