import { mergeIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Merge } from "./reaction";
import { mergeSchema } from "./schema";
import { ReactNode } from "react";

export const mergeMaterial: IReactionMaterial<ReactNode> = {
  name: "merge",
  icon: mergeIcon,
  label: "$merge",
  reactionType: ReactionType.SingleReaction,
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