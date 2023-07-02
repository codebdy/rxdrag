import { createUuid } from "@rxdrag/shared";
import { ActivityType } from "@rxdrag/minions-schema";
import { subscribeIcon } from "../icons";
import { SubscribeField } from "@rxdrag/fieldy-minions-activities";
import { IFieldyActivityMaterial } from "../types";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { fieldSchema } from "../readFieldValue/schema";

export const subscribeFieldMaterial: IFieldyActivityMaterial = {
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
  schema: fieldSchema,
}