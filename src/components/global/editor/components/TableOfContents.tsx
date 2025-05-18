import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { FC } from "react";

interface TableOfContentsProps {
  items: string[];
  onItemClick: (id: string) => void;
  className?: string;
}

const TableOfContents: FC<TableOfContentsProps> = ({
  items,
  onItemClick,
  className,
}) => {
  const { currentTheme } = useSlideStore();

  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn("cursor-pointer hover:underline")}
          onClick={() => onItemClick(item)}
        >
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
