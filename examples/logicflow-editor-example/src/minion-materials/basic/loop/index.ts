import { createUuid } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const loopMaterial: IRxDragActivityMaterial = {
  icon: loopIcon,
  label: "$loop",
  activityType: NodeType.Activity,
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