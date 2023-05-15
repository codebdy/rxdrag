import { ifIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Condition } from "./reaction";
import { conditionSchema } from "./schema";
import { ReactNode } from "react";

export const conditionMaterial: IActivityMaterial<ReactNode> = {
  name: "condition",
  icon: ifIcon,
  label: "$conditionCheck",
  reactionType: ActivityType.SingleActivity,
  color: "#5e76c3",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$inputCondition",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "true",
        label: "$true",
      },
      {
        id: createUuid(),
        name: "false",
        label: "$false",
      },
    ],
  },
  schema: conditionSchema,
  reaction: Condition,
}