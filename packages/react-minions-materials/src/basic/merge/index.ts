import { mergeIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Merge } from "./reaction";
import { mergeSchema } from "./schema";
import { ReactNode } from "react";

export const mergeMaterial: IActivityMaterial<ReactNode> = {
  name: "merge",
  icon: mergeIcon,
  label: "$merge",
  reactionType: ActivityType.SingleActivity,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input0",
        label: "input 0",
      },
      {
        id: createUuid(),
        name: "input1",
        label: "input 1",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: mergeSchema,
  reaction: Merge,
}