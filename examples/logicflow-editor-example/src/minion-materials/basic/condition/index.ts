import { createUuid } from "@rxdrag/shared";
import { conditionSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { ifIcon } from "../../icons";

export const conditionMaterial: IActivityMaterial<ReactNode> = {
  icon: ifIcon,
  label: "$conditionCheck",
  activityType: ActivityType.Activity,
  color: "#5e76c3",
  defaultPorts: {
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
  activityName: "condition"
}