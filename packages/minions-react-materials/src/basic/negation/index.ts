import { createId } from "@rxdrag/shared";
import { schema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IIncreaseConfig, Negation } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { negationIcon } from "@rxdrag/react-shared";

export const negationMaterial: IRxDragActivityMaterial<IIncreaseConfig> = {
  icon: negationIcon,
  label: "$negation",
  activityType: NodeType.Activity,
  color: "orange",
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
  schema: schema,
  activityName: Negation.NAME
}