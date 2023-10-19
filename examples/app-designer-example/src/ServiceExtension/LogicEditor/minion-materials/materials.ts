import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { basicActivities } from "./basic";
import { auxActivities } from "./auxtools";
import { advancedActivities } from "./advanced";

export const basicActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$basicAcitivites',
  materials: basicActivities,
}

export const advancedActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$advancedAcitivites',
  materials: advancedActivities,
}

export const auxActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: "$auxTools",
  materials: auxActivities,
}

export const backendActivityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  advancedActivityCategory,
  auxActivityCategory
]
