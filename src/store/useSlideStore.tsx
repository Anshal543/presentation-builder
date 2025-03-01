import { Slide } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  project: Project | null;
  setProject: (id: Project | null) => void;
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      setSlides: (slides: Slide[]) => set({ slides }),
      project: null,
      setProject: (project) => set({ project }),
    }),
    {
      name: "slides-storage",
    }
  )
);
