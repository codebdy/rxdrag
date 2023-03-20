import { subscribeIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { SubscribeField } from "./reaction";
import { subscribeFieldSchema } from "./schema";

export const subscribeFieldMaterial: IReactionMaterial = {
  name: "subscribeField",
  icon: subscribeIcon,
  label: "$subscribeField",
  reactionType: ReactionType.SingleReaction,
  meta: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: subscribeFieldSchema,
  reaction: SubscribeField,
}