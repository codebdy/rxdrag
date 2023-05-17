
import { debugIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { Debug } from "./reaction";
import { debugSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions";

export const debugMaterial: IActivityMaterial<ReactNode> = {
  name: "debug",
  icon: debugIcon,
  label: "$debug",
  activityType: ActivityType.Activity,
  color: "orange",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: debugSchema,
  reaction: Debug,
}