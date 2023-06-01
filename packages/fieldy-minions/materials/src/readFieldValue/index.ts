import { createUuid } from "@rxdrag/shared";
import { fieldSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { fieldReadIcon } from "../icons";
import { IFieldConfig, ReadFieldValue } from "@rxdrag/fieldy-minions-activities";
import { IFieldActivityMaterial } from "../types";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const readFieldValueMaterial: IFieldActivityMaterial<IFieldConfig> = {
  activityName: ReadFieldValue.NAME,
  icon: fieldReadIcon,
  label: "$readFieldValue",
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
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: fieldSchema,
  subTitle: (config?: IFieldConfig) => {
    return config?.fieldPath
  },
}