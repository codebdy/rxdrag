import { fixedValueIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { constValueSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { ConstActivityName } from "@rxdrag/minions-activities";

export const constValueMaterial: IActivityMaterial<ReactNode> = {
  icon: fixedValueIcon,
  label: "$fixedValue",
  activityType: ActivityType.Activity,
  color: "#1668dc",
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: constValueSchema,
  activityName: ConstActivityName,
}