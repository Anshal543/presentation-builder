import { PrismaUser } from "@/lib/types";
import { Project } from "@prisma/client";
import React from "react";

type Props = {
  projects: Project[];
  user: PrismaUser;
};

const BuyTemplateCard = ({ projects, user }: Props) => {
  return <div>BuyTemplateCard</div>;
};

export default BuyTemplateCard;
