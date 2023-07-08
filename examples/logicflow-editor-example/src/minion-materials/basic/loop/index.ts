import { createUuid } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const loopMaterial: IRxDragActivityMaterial = {
  icon: loopIcon,
  label: "$loop",
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
        label: "",
      },
    ],
  },
  schema: loopSchema,
  activityName: "loop",
}