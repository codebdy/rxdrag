import { createUuid } from "@rxdrag/shared";
import { mergeSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { mergeIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const mergeMaterial: IRxDragActivityMaterial = {
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
  activityName: "merge",
}