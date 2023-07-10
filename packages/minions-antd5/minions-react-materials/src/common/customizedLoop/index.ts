import { ActivityType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { CustomizedLoop } from "@rxdrag/minions-activities";
import { customizedLoopIcon } from "../../icons";
import { customizedLoopSchema } from "./schema";
import { createUuid } from "@rxdrag/shared";

export const customizedLoopMaterial: IRxDragActivityMaterial = {
  icon: customizedLoopIcon,
  label: "$customizedLoop",
  activityType: ActivityType.EmbeddedFlow,
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
        label: "$oneOutput",
      },
      {
        id: createUuid(),
        name: "finished",
        label: "$finished",
      },
    ],
  },
  schema: customizedLoopSchema,
  activityName: CustomizedLoop.NAME
}
