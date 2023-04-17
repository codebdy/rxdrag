
import { debugIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Debug } from "./reaction";
import { debugSchema } from "./schema";

export const debugMaterial: IReactionMaterial = {
  name: "debug",
  icon: debugIcon,
  label: "$debug",
  reactionType: ReactionType.SingleReaction,
  color: "orange",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: debugSchema,
  reaction: Debug,
}