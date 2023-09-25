import { createId } from "@rxdrag/shared";
import { fieldSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { fieldReadIcon } from "../icons";
import { IFieldConfig, ReadFieldValue } from "@rxdrag/fieldy-minions-activities";
import { IFieldyActivityMaterial } from "../types";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const readFieldValueMaterial: IFieldyActivityMaterial<IFieldConfig> = {
  activityName: ReadFieldValue.NAME,
  icon: fieldReadIcon,
  label: "$readFieldValue",
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