import { createId } from "@rxdrag/shared";
import { loopSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { loopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";

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
        name: "output",
        label: "",
      },
    ],
  },
  schema: loopSchema,
  activityName: "loop",
}