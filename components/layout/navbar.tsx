"use client";

import { Map } from "lucide-react";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import Button from "../shared/button";
import Image from "next/image";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <div className="mr-2">
              <Image
                src="/map-24x24.png"
                width={24}
                height={24}
                alt="Geotory Logo"
              />
            </div>
            <h1 className="font-serif text-3xl">Geotory</h1>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
