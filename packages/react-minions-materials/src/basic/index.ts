import { startIcon, endIcon } from "@rxdrag/react-shared";
import { INodeSchema, IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { fixedValueMaterial } from "./fixedValue";
import { intervalMaterial } from "./interval";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { randomMaterial } from "./random";
import { ReactNode } from "react";

export const startEndSchema: INodeSchema = {
  componentName: "Fragment",
  children: [nameSchema, labelSchema],
}

export const basicReactions: IActivityMaterial<ReactNode>[] = [
  {
    name: "start",
    icon: startIcon,
    label: "$input",
    reactionType: ActivityType.Start,
    meta: {
      name: "input"
    },
    schema: startEndSchema,
  },
  {
    name: "end",
    icon: endIcon,
    label: "$output",
    reactionType: ActivityType.End,
    meta: {
      name: "output"
    },
    schema: startEndSchema,
  },
  conditionMaterial,
  loopMaterial,
  mergeMaterial,
  //switchMaterial,
  delayMaterial,
  randomMaterial,
  intervalMaterial,
  fixedValueMaterial,
]