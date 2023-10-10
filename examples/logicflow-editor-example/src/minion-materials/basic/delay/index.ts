import { createId } from "@rxdrag/shared";
import { delaySchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";
import { delayIcon } from "@rxdrag/react-shared";

export interface IDelayConfig {
  time?: number
}

export const delayMaterial: IRxDragActivityMaterial<IDelayConfig> = {
  icon: delayIcon,
  label: "$delay",
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
  schema: delaySchema,
  subTitle: (config?: IDelayConfig) => {
    if (config?.time) {
      return config?.time?.toString()
    }
  },
  activityName: "delay"
}