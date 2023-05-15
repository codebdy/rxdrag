import { subscribeIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { SubscribeField } from "./reaction";
import { subscribeFieldSchema } from "./schema";
import { ReactNode } from "react";

export const subscribeFieldMaterial: IActivityMaterial<ReactNode> = {
  name: "subscribeField",
  icon: subscribeIcon,
  label: "$subscribeField",
  reactionType: ActivityType.SingleActivity,
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