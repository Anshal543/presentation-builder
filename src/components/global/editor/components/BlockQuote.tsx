"use client";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { FC, HTMLAttributes, ReactNode } from "react";

interface BlockQuoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  className?: string;
}

const BlockQuote: FC<BlockQuoteProps> = ({ children, className, ...props }) => {
  const { currentTheme } = useSlideStore();
  return (
    <blockquote
      className={cn(
        "pl-4 border-l-4 italic",
        "my-4 py-2",
        "text-gray-700 dark:text-gray-300",
        className
      )}
      style={{ borderLeftColor: currentTheme.accentColor }}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default BlockQuote;
