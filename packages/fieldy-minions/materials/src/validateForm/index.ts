import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { formValidateIcon } from "../icons";
import { IFieldyActivityMaterial } from "../types";
import { ValidateForm } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { formSchema } from "../readFormValue/schema";

export const validateFormMaterial: IFieldyActivityMaterial = {
  activityName: ValidateForm.NAME,
  icon: formValidateIcon,
  label: "$validateForm",
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
        name: ValidateForm.OUTPUT_NAME_SUCCESS,
        label: "$success",
      },
      {
        id: createUuid(),
        name: ValidateForm.OUTPUT_NAME_FAILURE,
        label: "$failure",
      },
    ],
  },
  schema: formSchema,
}