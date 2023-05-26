
import { createUuid } from "@rxdrag/shared";
import { debugSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { DebugActivityName } from "@rxdrag/minions-activities"
import { debugIcon } from "../../icons";

export const debugMaterial: IActivityMaterial<ReactNode, INodeSchema> = {
  activityName: DebugActivityName,
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