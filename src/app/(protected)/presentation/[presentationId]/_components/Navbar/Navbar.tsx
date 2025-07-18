"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSlideStore } from "@/store/useSlideStore";
import { UserButton } from "@clerk/nextjs";
import { Home, Play, Share } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PresentationMode from "./PresentationMode";

type Props = { presentationId: string };

const Navbar = ({ presentationId }: Props) => {
  // Note complete this comp
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard",
    });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href="/dashboard" passHref>
        <Button
          variant="outline"
          className={`flex items-center gap-2`}
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline ">Return Home</span>
        </Button>
      </Link>
      <Link
        href="/presentation/template-market"
        className="text-lg font-semibold hidden sm:block "
      >
        Go to Market Strategy
      </Link>
      <div className="flex items-center gap-4">
        <Button
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
          variant="outline"
          onClick={handleCopy}
        >
          <Share className="w-4 h-4" />
        </Button>
        {/* wip: add lemon sq sell templates */}
        {/* <SellTemplate /> */}
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4 " />
          <span className="hidden sm:inline">Present</span>
        </Button>
        <UserButton />
      </div>
      {isPresentationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
};

export default Navbar;
