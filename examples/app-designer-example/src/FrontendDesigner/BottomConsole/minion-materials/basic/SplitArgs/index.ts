import { createUuid } from "@rxdrag/shared";
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
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output1",
        label: "output1",
      },
      {
        id: createUuid(),
        name: "output2",
        label: "output2",
      },
    ],
  },
  schema: splitArgsSchema,
  activityName: "splitObject"
}