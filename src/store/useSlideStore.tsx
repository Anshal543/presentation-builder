import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface SlideState {
  project: Project | null;
  setProject: (id: Project | null) => void;
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  resetSlideStore: () => void;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  getOrderedSlides: () => Slide[];
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  removeSlide: (id: string) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;
}

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      setSlides: (slides: Slide[]) => set({ slides }),
      project: null,
      setProject: (project) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
      resetSlideStore: () => {
        set({
          project: null,
          slides: [],
          currentTheme: defaultTheme,
        });
      },
      currentSlide: 0,
      setCurrentSlide: (index: number) => {
        set({ currentSlide: index });
      },
      getOrderedSlides: () => {
        return get()
          .slides.slice()
          .sort((a, b) => a.slideOrder - b.slideOrder);
      },
      reorderSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newSlides = [...state.slides];
          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },
      removeSlide: (id: string) => {
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        }));
      },
      addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlide = [...state.slides];
          newSlide.splice(index, 0, { ...slide, id: uuidv4() });
          newSlide.forEach((s, i) => {
            s.slideOrder = i;
          });
          return { slides: newSlide, currentSlide: index };
        });
      },
    }),
    {
      name: "slides-storage",
    }
  )
);
