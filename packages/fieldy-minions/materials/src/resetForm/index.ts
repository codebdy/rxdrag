import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { resetFormIcon } from "../icons";
import { IFieldyActivityMaterial } from "../types";
import { ResetFormActivity } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const resetFormMaterial: IFieldyActivityMaterial = {
  activityName: ResetFormActivity.NAME,
  icon: resetFormIcon,
  label: "$resetForm",
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