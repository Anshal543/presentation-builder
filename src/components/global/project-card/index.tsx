"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import { motion } from "motion/react";
import { itemVariants } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  //   themeName: string;
  isDelete?: boolean;
  slideData: JsonValue;
  src: string;
};

const ProjectCard = ({
  createdAt,
  projectId,
  slideData,
  src,
  //   themeName,
  title,
  isDelete,
}: Props) => {
  const { setSlides } = useSlideStore();
  const router = useRouter();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };
  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumbnailPreview />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
