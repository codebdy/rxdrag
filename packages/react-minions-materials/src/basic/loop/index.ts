import { loopIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Loop } from "./reaction";
import { loopSchema } from "./schema";
import { ReactNode } from "react";

export const loopMaterial: IReactionMaterial<ReactNode> = {
  name: "loop",
  icon: loopIcon,
  label: "$loop",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$input",
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
  schema: loopSchema,
  reaction: Loop,
}