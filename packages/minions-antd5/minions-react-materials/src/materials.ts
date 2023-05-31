import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { basicActivities } from "./basic";
import { auxActivities } from "./auxtools";
import { commonActivites } from "./common";

export const  basicActivityCategory:ActivityMaterialCategory<ReactNode> = {
  name: '$basicReactions',
    materials: basicActivities,
}

export const  commonActivityCategory:ActivityMaterialCategory<ReactNode> = {
  name: '$commonReactions',
  materials: commonActivites,
}

export const  auxActivityCategory:ActivityMaterialCategory<ReactNode> = {
  name: "$auxTools",
  materials: auxActivities,
}