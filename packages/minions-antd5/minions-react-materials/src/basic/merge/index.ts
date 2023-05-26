import { createUuid } from "@rxdrag/shared";
import { mergeSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { MergeActivityName } from "@rxdrag/minions-activities";
import { mergeIcon } from "../../icons";

export const mergeMaterial: IActivityMaterial<ReactNode> = {
  icon: mergeIcon,
  label: "$merge",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input0",
        label: "input 0",
      },
      {
        id: createUuid(),
        name: "input1",
        label: "input 1",
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
  schema: mergeSchema,
  activityName: MergeActivityName,
}