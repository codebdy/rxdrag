import { createId } from "@rxdrag/shared";
import { constValueSchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { fixedValueIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";

export const constValueMaterial: IActivityMaterial<ReactNode> = {
  activityName: "constValue",
  icon: fixedValueIcon,
  label: "$fixedValue",
  activityType: NodeType.Activity,
  color: "#1668dc",
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: constValueSchema,
}