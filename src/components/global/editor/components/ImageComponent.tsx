import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";
import UploadImage from "./UploadImage";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
  imageLoading: boolean;
}

const CustomImage = ({
  src,
  alt,
  className,
  isPreview = false,
  contentId,
  onContentChange,
  isEditable = true,
  imageLoading,
}: ImageProps) => {
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
      {imageLoading ? (
        <div className="px-2 w-full h-full">
          <Skeleton className="w-full h-full " />
        </div>
      ) : (
        <>
          <Image
            src={src}
            width={isPreview ? 48 : 800}
            height={isPreview ? 48 : 800}
            alt={alt}
            className={`object-cover w-full h-full rounded-lg ${className}`}
            priority
          />
          {!isPreview && isEditable && (
            <div className="absolute top-0 left-0 hidden group-hover:block">
              <UploadImage
                contentId={contentId}
                onContentChange={onContentChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomImage;
