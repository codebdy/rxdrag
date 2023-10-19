import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
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
  activityName: "customizedLoop"
}
