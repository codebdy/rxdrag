import { createId } from "@rxdrag/shared";
import { splitObjectSchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { splitObjectIcon } from "../../icons";
import { SplitObject } from "@rxdrag/minions-activities";

export const splitObjectMaterial: IActivityMaterial<ReactNode> = {
  icon: splitObjectIcon,
  label: "$splitObject",
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
  schema: splitObjectSchema,
  activityName: SplitObject.NAME
}