import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { IFieldConfig, ValidateField } from "@rxdrag/fieldy-minions-activities";
import { IFieldActivityMaterial } from "../types";
import { fieldValidateIcon } from "../icons";
import { fieldSchema } from "../readFieldValue/schema";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const validateFieldMaterial: IFieldActivityMaterial<IFieldConfig> = {
  activityName: ValidateField.NAME,
  icon: fieldValidateIcon,
  label: "$validateField",
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
        name: "success",
        label: "$success",
      },
      {
        id: createUuid(),
        name: "failure",
        label: "$failure",
      },
    ],
  },
  schema: fieldSchema,
  subTitle: (config?: IFieldConfig) => {
    return config?.fieldPath
  },
}