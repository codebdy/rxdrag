import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { formIcon } from "../icons";
import { IFieldConfig, SetFieldValue } from "@rxdrag/fieldy-minions-activities";
import { IFieldActivityMaterial } from "../types";
import { fieldSchema } from "../readFieldValue/schema";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const setFieldValueMaterial: IFieldActivityMaterial<IFieldConfig> = {
    activityName: SetFieldValue.NAME,
    icon: formIcon,
    label: "$setFieldValue",
    activityType: ActivityType.Activity,
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