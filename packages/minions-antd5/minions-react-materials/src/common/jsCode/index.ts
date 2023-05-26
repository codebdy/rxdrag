import { createUuid } from "@rxdrag/shared";
import { jsCodeSchema } from "./schema";
import { ReactNode } from "react";
import { JsCodeActivityName } from "@rxdrag/minions-activities";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { jsIcon } from "../../icons";

export const jsCodeMaterial: IActivityMaterial<ReactNode> = {
  icon: jsIcon,
  label: "$jsCode",
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
        name: "output",
        label: "output",
      },
    ],
  },
  schema: jsCodeSchema,
  activityName: JsCodeActivityName,
}