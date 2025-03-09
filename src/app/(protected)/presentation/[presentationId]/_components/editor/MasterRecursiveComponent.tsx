import { ContentItem } from "@/lib/types";
import React, { ChangeEvent, memo, useCallback } from "react";
import { motion } from "motion/react";
import { Heading1 } from "@/components/global/editor/components/Headings";

interface MasterRecursiveComponentProps {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
  imageLoading: boolean;
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = memo(
  ({
    content,
    imageLoading,
    onContentChange,
    slideId,
    index,
    isEditable,
    isPreview,
  }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      conChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full">
            <Heading1 />
          </motion.div>
        );

      default:
        break;
    }
    return <></>;
  }
);

const MasterRecursiveComponent = (props: MasterRecursiveComponentProps) => {
  return <div>MasterRecursiveComponent</div>;
};

export default MasterRecursiveComponent;
