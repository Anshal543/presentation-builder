"use client";
import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ColumnProps {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  slideId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
  imageLoading: boolean;
}

const ColumnComponent = ({
  content,
  className,
  slideId,
  onContentChange,
  isPreview = false,
  isEditable = true,
  imageLoading = false,
}: ColumnProps) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (content.length === 0) {
      setColumns(createDefaultColumns(2));
    } else {
      setColumns(content);
    }
  }, [content]);

  const createDefaultColumns = (count: number) => {
    return Array(count)
      .fill(null)
      .map(() => ({
        id: uuidv4(),
        type: "paragraph" as const,
        name: "Paragraph",
        content: "",
        placeholder: "Start typing...",
      }));
  };

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full w-full flex ",
          !isEditable && "!border-0",
          className
        )}
      >
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn("h-full w-full", item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                  imageLoading={imageLoading}
                />
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
