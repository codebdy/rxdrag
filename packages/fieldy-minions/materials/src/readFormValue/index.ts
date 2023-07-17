import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { formReadIcon } from "../icons";
import { IFieldyActivityMaterial } from "../types";
import { ReadFormValue } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const readFormValueMaterial: IFieldyActivityMaterial = {
  activityName: ReadFormValue.NAME,
  icon: formReadIcon,
  label: "$readFormValue",
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