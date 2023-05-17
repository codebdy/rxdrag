import { startIcon, endIcon } from "@rxdrag/react-shared";
import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { fixedValueMaterial } from "./fixedValue";
import { intervalMaterial } from "./interval";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { randomMaterial } from "./random";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";

export const startEndSchema: INodeSchema = {
  componentName: "Fragment",
  children: [nameSchema, labelSchema],
}

export const basicReactions: IActivityMaterial<ReactNode>[] = [
  {
    name: "start",
    icon: startIcon,
    label: "$input",
    activityType: ActivityType.Start,
    meta: {
      name: "input"
    },
    schema: startEndSchema,
  },
  {
    name: "end",
    icon: endIcon,
    label: "$output",
    activityType: ActivityType.End,
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