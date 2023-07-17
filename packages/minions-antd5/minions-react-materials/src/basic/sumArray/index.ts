
import { createUuid } from "@rxdrag/shared";
import { sumArraySchema } from "./schema";
import { SumArray } from "@rxdrag/minions-activities";
import { ActivityType } from "@rxdrag/minions-schema";
import { sumIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const sumArrayMaterial: IRxDragActivityMaterial = {
  icon: sumIcon,
  label: "$sumArray",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: sumArraySchema,
  activityName: SumArray.NAME,
}