
import { createId } from "@rxdrag/shared";
import { sumArraySchema } from "./schema";
import { SumArray } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { sumIcon } from "@rxdrag/react-shared";

export const sumArrayMaterial: IRxDragActivityMaterial = {
  icon: sumIcon,
  label: "$sumArray",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: sumArraySchema,
  activityName: SumArray.NAME,
}