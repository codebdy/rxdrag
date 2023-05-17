
import { debugIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { debugSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { DebugActivityName } from "@rxdrag/minions-activities"

export const debugMaterial: IActivityMaterial<ReactNode, INodeSchema> = {
  name: DebugActivityName,
  icon: debugIcon,
  label: "$debug",
  activityType: ActivityType.Activity,
  color: "orange",
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: debugSchema,
}