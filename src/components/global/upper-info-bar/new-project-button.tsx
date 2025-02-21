"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  user: User;
};

const NewProjectButton = ({ user }: Props) => {
  // Note handle click needs completion
  const router = useRouter();
  return (
    <Button
      size={"lg"}
      className="rounded-lg font-semibold"
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
