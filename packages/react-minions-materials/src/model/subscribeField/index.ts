import { subscribeIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { SubscribeField } from "./reaction";
import { subscribeFieldSchema } from "./schema";
import { ReactNode } from "react";

export const subscribeFieldMaterial: IActivityMaterial<ReactNode> = {
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