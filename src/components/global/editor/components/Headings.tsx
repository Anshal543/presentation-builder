"use client";

import React from "react";

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ className, styles, isPreview = false, ...props }, ref) => {}
  );
};

const Heading1 = createHeading("Heading1", "text-4xl");

export { Heading1 };
