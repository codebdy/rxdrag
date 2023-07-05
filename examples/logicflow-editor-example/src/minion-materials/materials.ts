import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { basicActivities } from "./basic";
import { auxActivities } from "./auxtools";

export const basicActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$basicReactions',
  materials: basicActivities,
}

export const auxActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: "$auxTools",
  materials: auxActivities,
}