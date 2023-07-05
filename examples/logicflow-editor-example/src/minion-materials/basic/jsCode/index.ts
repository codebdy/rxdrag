import { createUuid } from "@rxdrag/shared";
import { jsCodeSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { jsIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const jsCodeMaterial: IRxDragActivityMaterial = {
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
  activityName: "jsCode",
}