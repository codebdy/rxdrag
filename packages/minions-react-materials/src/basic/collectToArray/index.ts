
import { createId } from "@rxdrag/shared";
import { collectToArray } from "./schema";
import { CollectToArray } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { collectToArrayIcon } from "@rxdrag/react-shared";

export const collectToArrayMaterial: IRxDragActivityMaterial = {
  icon: collectToArrayIcon,
  label: "$collectToArray",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input0",
        label: "input 0",
      },
      {
        id: createId(),
        name: "input1",
        label: "input 1",
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
  schema: collectToArray,
  activityName: CollectToArray.NAME,
}