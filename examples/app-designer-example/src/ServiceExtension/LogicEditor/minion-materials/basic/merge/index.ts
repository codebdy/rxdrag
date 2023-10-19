import { createId } from "@rxdrag/shared";
import { mergeSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { mergeIcon } from "../../icons";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";

export const mergeMaterial: IRxDragActivityMaterial = {
  icon: mergeIcon,
  label: "$merge",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input0",
        label: "input 0",
      },
      {
        id: createId(),
        name: "input1",
        label: "input 1",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: mergeSchema,
  activityName: "merge",
}