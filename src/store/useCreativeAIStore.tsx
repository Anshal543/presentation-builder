import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CreativeAIStore {
  currentAiPrompt: string;
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines: () => void;
}

const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      currentAiPrompt: "",
      setCurrentAiPrompt: (prompt: string) => {
        set({ currentAiPrompt: prompt });
      },
      resetOutlines: () => {
        set({ outlines: [] });
      },
    }),
    {
      name: "creative-ai",
    }
  )
);

export default useCreativeAIStore;
