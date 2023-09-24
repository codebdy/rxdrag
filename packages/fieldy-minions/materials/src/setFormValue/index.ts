import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { formIcon } from "../icons";
import { SetFormValue } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IFieldyActivityMaterial } from "../types";
import { formSchema } from "../readFormValue/schema";

export const setFormValueMaterial: IFieldyActivityMaterial = {
  activityName: SetFormValue.NAME,
  icon: formIcon,
  label: "$setFormValue",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
  },
  schema: formSchema,
}