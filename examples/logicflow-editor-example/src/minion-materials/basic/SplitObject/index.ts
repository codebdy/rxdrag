import { createUuid } from "@rxdrag/shared";
import { splitObjectSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { splitObjectIcon } from "../../icons";

export const splitObjectMaterial: IActivityMaterial<ReactNode> = {
  icon: splitObjectIcon,
  label: "$splitObject",
  activityType: ActivityType.Activity,
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
        name: "output1",
        label: "output1",
      },
      {
        id: createUuid(),
        name: "output2",
        label: "output2",
      },
    ],
  },
  schema: splitObjectSchema,
  activityName: "splitObject"
}