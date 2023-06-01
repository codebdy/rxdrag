import { createUuid } from "@rxdrag/shared";
import { subscribeFieldSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { subscribeIcon } from "../icons";
import { SubscribeField } from "@rxdrag/fieldy-minions-activities";
import { IFieldActivityMaterial } from "../types";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const subscribeFieldMaterial: IFieldActivityMaterial = {
  activityName: SubscribeField.NAME,
  icon: subscribeIcon,
  label: "$subscribeField",
  activityType: ActivityType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createUuid(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: subscribeFieldSchema,
}