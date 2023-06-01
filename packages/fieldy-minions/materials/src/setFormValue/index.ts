import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { formIcon } from "../icons";
import { SetFormValue } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IFieldyActivityMaterial } from "../types";
import { formSchema } from "../readFormValue/schema";

export const setFormValueMaterial: IFieldyActivityMaterial = {
  activityName: SetFormValue.NAME,
  icon: formIcon,
  label: "$setFormValue",
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
  schema: formSchema,
}