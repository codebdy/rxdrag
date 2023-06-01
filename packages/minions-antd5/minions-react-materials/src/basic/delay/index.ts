import { createUuid } from "@rxdrag/shared";
import { delaySchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { Delay, IDelayConfig } from "@rxdrag/minions-activities";
import { delayIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const delayMaterial: IRxDragActivityMaterial<IDelayConfig> = {
  icon: delayIcon,
  label: "$delay",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
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