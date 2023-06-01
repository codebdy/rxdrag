import { createUuid } from "@rxdrag/shared";
import { subscribeFieldSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { subscribeIcon } from "../icons";
import { SubscribeField } from "@rxdrag/fieldy-minions-activities";

export const subscribeFieldMaterial: IActivityMaterial<ReactNode> = {
  activityName: SubscribeField.NAME,
  icon: subscribeIcon,
  label: "$subscribeField",
  activityType: ActivityType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: subscribeFieldSchema,
}