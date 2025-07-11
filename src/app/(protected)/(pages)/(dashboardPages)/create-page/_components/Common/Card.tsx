"use client";
import { OutlineCard } from "@/lib/types";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CardProps {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
}

const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers,
  onDragOver,
  dragOverStyles,
}: CardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      <div
        draggable
        style={dragOverStyles}
        onDragOver={onDragOver}
        {...dragHandlers}
      >
        <UICard
          className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90 ${
            isEditing || isSelected ? "border-primary bg-transparent" : ""
          }`}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex justify-between items-start">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                className="text-base sm:text-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary-20 ${
                    isEditing || isSelected
                      ? "bg-secondary dark:text-black"
                      : ""
                  }`}
                >
                  {card.order}
                </span>
                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
