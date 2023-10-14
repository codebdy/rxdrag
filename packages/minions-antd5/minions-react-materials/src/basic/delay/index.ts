import { createId } from "@rxdrag/shared";
import { delaySchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { Delay, IDelayConfig } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { delayIcon } from "@rxdrag/react-shared";

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
  activityName: Delay.NAME
}