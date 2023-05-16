import { jsIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { JsCode } from "./reaction";
import { jsCodeSchema } from "./schema";
import { ReactNode } from "react";

export const jsCodeMaterial: IActivityMaterial<ReactNode> = {
  name: "jsCode",
  icon: jsIcon,
  label: "$jsCode",
  reactionType: ActivityType.SingleActivity,
  meta: {
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
        label: "output",
      },
    ],
  },
  schema: jsCodeSchema,
  reaction: JsCode,
}