import { createUuid } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { ReactNode } from "react";
import { LoopActivityName } from "@rxdrag/minions-activities";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";

export const loopMaterial: IActivityMaterial<ReactNode> = {
  icon: loopIcon,
  label: "$loop",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$input",
      },

    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: loopSchema,
  activityName: LoopActivityName,
}