import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { FC } from "react";

interface CodeBlockProps {
  code?: string;
  language?: string;
  onChange: (newCode: string) => void;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language,
  onChange,
  className,
}) => {
  const { currentTheme } = useSlideStore();
  return (
    <pre
      className={cn("p-4 rounded-lg overflow-x-auto", className)}
      style={{ backgroundColor: currentTheme.accentColor + "20" }}
    >
      <code className={`language-${language}`}>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent outline-none font-mono"
          style={{ color: currentTheme.fontColor }}
        />
      </code>
    </pre>
  );
};

export default CodeBlock;
