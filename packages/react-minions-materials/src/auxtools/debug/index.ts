
import { debugIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Debug } from "./reaction";
import { debugSchema } from "./schema";
import { ReactNode } from "react";

export const debugMaterial: IActivityMaterial<ReactNode> = {
  name: "debug",
  icon: debugIcon,
  label: "$debug",
  reactionType: ActivityType.SingleActivity,
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