import { NodeType } from "@rxdrag/minions-schema";
import { customizedLoopIcon } from "../../icons";
import { customizedLoopSchema } from "./schema";
import { createId } from "@rxdrag/shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";

export const customizedLoopMaterial: IRxDragActivityMaterial = {
  icon: customizedLoopIcon,
  label: "$customizedLoop",
  activityType: NodeType.EmbeddedFlow,
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
        label: "$oneOutput",
      },
      {
        id: createId(),
        name: "finished",
        label: "$finished",
      },
    ],
  },
  schema: customizedLoopSchema,
  activityName: "customizedLoop"
}
