import { createId } from "@rxdrag/shared";
import { splitArgsSchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { argsIcon } from "../../icons";

export const splitArgsMaterial: IActivityMaterial<ReactNode> = {
  icon: argsIcon,
  label: "$splitArgs",
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
  schema: splitArgsSchema,
  activityName: "splitObject"
}