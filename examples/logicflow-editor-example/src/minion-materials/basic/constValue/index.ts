import { createUuid } from "@rxdrag/shared";
import { constValueSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { fixedValueIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "minion-materials/consts";

export const constValueMaterial: IActivityMaterial<ReactNode> = {
  activityName: "constValue",
  icon: fixedValueIcon,
  label: "$fixedValue",
  activityType: ActivityType.Activity,
  color: "#1668dc",
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
  schema: constValueSchema,
}