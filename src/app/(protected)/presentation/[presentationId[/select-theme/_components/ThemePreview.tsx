"use client";
import { useSlideStore } from "@/store/useSlideStore";
import { useAnimation } from "motion/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const ThemePreview = (props: Props) => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [project]);
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  return <div>ThemePreview</div>;
};

export default ThemePreview;
