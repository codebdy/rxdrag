import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { basicActivities } from "./basic";
import { auxActivities } from "./auxtools";
import { commonActivities } from "./common";
import { controllerActivities } from "./controller";

export const basicActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$basicReactions',
  materials: basicActivities,
}

export const commonActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$commonReactions',
  materials: commonActivities,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivityCategory: ActivityMaterialCategory<ReactNode, any, any, any> = {
  name: '$componentControl',
  materials: controllerActivities,
}

export const auxActivityCategory: ActivityMaterialCategory<ReactNode> = {
  name: "$auxTools",
  materials: auxActivities,
}