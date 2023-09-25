import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { IFieldConfig, ValidateField } from "@rxdrag/fieldy-minions-activities";
import { IFieldyActivityMaterial } from "../types";
import { fieldValidateIcon } from "../icons";
import { fieldSchema } from "../readFieldValue/schema";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const validateFieldMaterial: IFieldyActivityMaterial<IFieldConfig> = {
  activityName: ValidateField.NAME,
  icon: fieldValidateIcon,
  label: "$validateField",
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
        name: ValidateField.OUTPUT_NAME_SUCCESS,
        label: "$success",
      },
      {
        id: createId(),
        name: ValidateField.OUTPUT_NAME_FAILURE,
        label: "$failure",
      },
    ],
  },
  schema: fieldSchema,
  subTitle: (config?: IFieldConfig) => {
    return config?.fieldPath
  },
}