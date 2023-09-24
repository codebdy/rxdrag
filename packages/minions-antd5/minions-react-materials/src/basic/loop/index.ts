import { createId } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { Loop } from "@rxdrag/minions-activities";

export const loopMaterial: IRxDragActivityMaterial = {
  icon: loopIcon,
  label: "$loop",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: Loop.PORT_OUTPUT,
        label: "$oneOutput",
      },
      {
        id: createId(),
        name: Loop.PORT_FINISHED,
        label: "$finished",
      },
    ],
  },
  schema: loopSchema,
  activityName: Loop.NAME,
}