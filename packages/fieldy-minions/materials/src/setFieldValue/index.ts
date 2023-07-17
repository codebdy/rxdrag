import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { fieldIcon } from "../icons";
import { IFieldConfig, SetFieldValue } from "@rxdrag/fieldy-minions-activities";
import { IFieldyActivityMaterial } from "../types";
import { fieldSchema } from "../readFieldValue/schema";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const setFieldValueMaterial: IFieldyActivityMaterial<IFieldConfig> = {
    activityName: SetFieldValue.NAME,
    icon: fieldIcon,
    label: "$setFieldValue",
    activityType: NodeType.Activity,
    defaultPorts: {
      inPorts: [
        {
          id: createUuid(),
          name: DEFAULT_INPUT_NAME,
          label: "",
        },
      ],
    },
    schema: fieldSchema,
    subTitle: (config?: IFieldConfig) => {
      return config?.fieldPath
    },
  }