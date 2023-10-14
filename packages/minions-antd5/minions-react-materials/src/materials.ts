import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { basicActivities } from "./basic";
import { auxActivities } from "./auxtools";
import { commonActivities } from "./common";

export const basicActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$basicAcitivites',
  materials: basicActivities,
}

export const commonActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$advancedAcitivites',
  materials: commonActivities,
}

export const auxActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: "$auxTools",
  materials: auxActivities,
}

export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  commonActivityCategory,
  auxActivityCategory
]
