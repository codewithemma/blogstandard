"use client";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo/Logo";

const AppLayout = ({ children }) => {
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800 px-2 ">
          <Logo />
          <Link href="/post/new" className="btn">
            New Post
          </Link>
          <Link href="/token-topup" className="block mt-2 text-center ">
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />{" "}
            <span className="pl-1">0 tokens available</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800">
          list of posts
        </div>
        <div className="bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
          {session && session?.user ? (
            <>
              <div className="min-w-[50px]">
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold">{session?.user?.email}</div>
                <button className="text-sm" onClick={signOut}>
                  logout
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => signIn("auth0")}>Login</button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
