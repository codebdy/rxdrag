import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { switchIcon } from "@rxdrag/react-shared";
import { switchSchema } from "./schema";

export const switchMaterial: IReactionMaterial = {
  name: "switch",
  icon: switchIcon,
  label: "$switch",
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
        name: "output0",
        label: "output 0",
      },
      {
        id: createUuid(),
        name: "output1",
        label: "output 1",
      },
    ],
  },
  schema: switchSchema
} 