import { createId } from "@rxdrag/shared";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { Equal } from "@rxdrag/minions-activities";
import { eqIcon } from "@rxdrag/react-shared";

export const equalMaterial: IActivityMaterial<ReactNode> = {
  icon: eqIcon,
  label: "$equal",
  activityType: NodeType.Activity,
  color: "#5e76c3",
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input1",
        label: "",
      },
      {
        id: createId(),
        name: "input2",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "true",
        label: "$true",
      },
      {
        id: createId(),
        name: "false",
        label: "$false",
      },
    ],
  },
  activityName: Equal.NAME
}