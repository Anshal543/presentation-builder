"use client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import React from "react";
import { containerVariants } from "@/lib/constants";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const router = useRouter();
  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      ScratchPage
    </motion.div>
  );
};

export default ScratchPage;
