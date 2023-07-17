
import { createUuid } from "@rxdrag/shared";
import { collectToArray } from "./schema";
import { CollectToArray } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { collectToArrayIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const collectToArrayMaterial: IRxDragActivityMaterial = {
  icon: collectToArrayIcon,
  label: "$collectToArray",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "input",
      },
      {
        id: createUuid(),
        name: CollectToArray.PORT_FINISHED,
        label: "finished",
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