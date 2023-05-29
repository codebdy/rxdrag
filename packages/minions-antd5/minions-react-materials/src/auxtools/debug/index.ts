
import { createUuid } from "@rxdrag/shared";
import { debugSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { Debug } from "@rxdrag/minions-activities"
import { debugIcon } from "../../icons";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const debugMaterial: IActivityMaterial<ReactNode, INodeSchema> = {
  activityName: Debug.NAME,
  icon: debugIcon,
  label: "$debug",
  activityType: ActivityType.Activity,
  color: "orange",
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
  },
  schema: debugSchema,
}