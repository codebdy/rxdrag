import { createId } from "@rxdrag/shared";
import { increaseSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IIncreaseConfig, Increase } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { increaseIcon } from "@rxdrag/react-shared";

export const increaseMaterial: IRxDragActivityMaterial<IIncreaseConfig> = {
  icon: increaseIcon,
  label: "$increase",
  activityType: NodeType.Activity,
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
  schema: increaseSchema,
  subTitle: (config?: IIncreaseConfig) => {
    if (config?.step) {
      return config?.step?.toString()
    }
  },
  activityName: Increase.NAME
}