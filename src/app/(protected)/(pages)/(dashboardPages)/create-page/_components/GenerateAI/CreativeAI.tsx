"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { containerVariants, itemVariants } from "@/lib/constants";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { useToast } from "@/hooks/use-toast";
import { OutlineCard } from "@/lib/types";
import { generateCreativePrompt } from "@/actions/chatgpt";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

const CreateAI = ({ onBack }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setProject } = useSlideStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [noOfCards, setNoOfCards] = useState(0);

  const { prompts, addPrompt } = usePromptStore();

  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an outline.",
        variant: "destructive",
      });
      console.log("Please enter a prompt to generate an outline.");
      return;
    }
    setIsGenerating(true);

    const res = await generateCreativePrompt(currentAiPrompt);
    if (res.status === 200 && res?.data?.outlines) {
      // console.log(res?.data?.outlines);
      const cardsData: OutlineCard[] = [];
      res?.data?.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      toast({
        title: "Success",
        description: "Outline generated successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate outline. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (outlines.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one card to generate PPT",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards)
      );
      if (res.status !== 200 || !res.data) {
        throw new Error("Unable to create project");
      }

      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);
      addPrompt({
        id: uuidv4(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      setCurrentAiPrompt("");
      resetOutlines();
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Button variant={"outline"} className="mb-4" onClick={handleBack}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would like to create today?</p>
      </motion.div>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={currentAiPrompt}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
            placeholder="Enter Prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, idx) => idx + 1
                  ).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              onClick={resetCards}
              size="icon"
              aria-label="Reset cards"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        setEditingCard={setEditingCard}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        editText={editText}
        setEditText={setEditText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines?.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate PPT"
          )}
        </Button>
      )}
      {prompts?.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreateAI;
