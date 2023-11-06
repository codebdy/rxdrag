import { createId } from "@rxdrag/shared";
import { arrayToTreeSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { ArrayToTree } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";
import { arrayToTreeIcon } from "@rxdrag/react-shared";

export const arrayToTreeMaterial: IRxDragActivityMaterial = {
  icon: arrayToTreeIcon,
  label: "$arrayToTree",
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
  schema: arrayToTreeSchema,
  activityName: ArrayToTree.NAME,
}