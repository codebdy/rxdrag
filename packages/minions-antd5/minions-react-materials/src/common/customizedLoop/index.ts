import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { CustomizedLoop } from "@rxdrag/minions-activities";
import { customizedLoopSchema } from "./schema";
import { createId } from "@rxdrag/shared";
import { customizedLoopIcon } from "@rxdrag/react-shared";

export const customizedLoopMaterial: IRxDragActivityMaterial = {
  icon: customizedLoopIcon,
  label: "$customizedLoop",
  activityType: NodeType.EmbeddedFlow,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: CustomizedLoop.PORT_INPUT,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: CustomizedLoop.PORT_OUTPUT,
        label: "$oneOutput",
      },
      {
        id: createId(),
        name: CustomizedLoop.PORT_FINISHED,
        label: "$finished",
      },
    ],
  },
  schema: customizedLoopSchema,
  activityName: CustomizedLoop.NAME
}
