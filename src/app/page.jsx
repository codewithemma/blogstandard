"use client";
import Logo from "@/components/Logo/Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Home({ Component, pageProps }) {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src="/hero.webp" alt="main" fill className="absolute" />
      <div className="relative z-10 text-white py-5 px-10 max-w-screen-sm text-center bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
        <p className="mb-4">
          The AI-powered SAAS solution to generate SEO-optimized blog posts in
          minutes. Get high-quality content, without sacrificing your time.
        </p>
        <Link href="/post/new" className="btn">
          Begin
        </Link>
      </div>
    </div>
  );
}
