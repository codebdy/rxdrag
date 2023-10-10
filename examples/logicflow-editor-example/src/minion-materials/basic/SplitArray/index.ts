import { createId } from "@rxdrag/shared";
import { splitArraySchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { splitArrayIcon } from "@rxdrag/react-shared";

export const splitArrayMaterial: IActivityMaterial<ReactNode> = {
  icon: splitArrayIcon,
  label: "$splitArray",
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
        name: "output1",
        label: "output1",
      },
      {
        id: createId(),
        name: "output2",
        label: "output2",
      },
    ],
  },
  schema: splitArraySchema,
  activityName: "splitArray"
}