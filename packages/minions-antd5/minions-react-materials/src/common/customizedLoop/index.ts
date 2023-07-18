import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { CustomizedLoop } from "@rxdrag/minions-activities";
import { customizedLoopIcon } from "../../icons";
import { customizedLoopSchema } from "./schema";
import { createUuid } from "@rxdrag/shared";

export const customizedLoopMaterial: IRxDragActivityMaterial = {
  icon: customizedLoopIcon,
  label: "$customizedLoop",
  activityType: NodeType.EmbeddedFlow,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: CustomizedLoop.PORT_INPUT,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: CustomizedLoop.PORT_OUTPUT,
        label: "$oneOutput",
      },
      {
        id: createUuid(),
        name: CustomizedLoop.PORT_FINISHED,
        label: "$finished",
      },
    ],
  },
  schema: customizedLoopSchema,
  activityName: CustomizedLoop.NAME
}
