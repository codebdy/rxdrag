import { createUuid } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { Loop } from "@rxdrag/minions-activities";

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
        name: Loop.PORT_OUTPUT,
        label: "$oneOutput",
      },
      {
        id: createUuid(),
        name: Loop.PORT_FINISHED,
        label: "$finished",
      },
    ],
  },
  schema: loopSchema,
  activityName: Loop.NAME,
}