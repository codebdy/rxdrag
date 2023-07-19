
import { createUuid } from "@rxdrag/shared";
import { collectToArray } from "./schema";
import { CollectToArray } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { collectToArrayIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const collectToArrayMaterial: IRxDragActivityMaterial = {
  icon: collectToArrayIcon,
  label: "$collectToArray",
  activityType: NodeType.Activity,
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
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: collectToArray,
  activityName: CollectToArray.NAME,
}