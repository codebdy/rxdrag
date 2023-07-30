import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { resetFieldIcon } from "../icons";
import { IFieldyActivityMaterial } from "../types";
import { ResetFieldActivity } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const resetFieldMaterial: IFieldyActivityMaterial = {
  activityName: ResetFieldActivity.NAME,
  icon: resetFieldIcon,
  label: "$resetField",
  activityType: NodeType.Activity,
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
  }
}