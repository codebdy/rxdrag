import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { ReactNode } from "react";
import { formIcon } from "../icons";
import { SetFormValue } from "@rxdrag/fieldy-minions-activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";

export const setFieldValueMaterial: IActivityMaterial<ReactNode> = {
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
    }
  }