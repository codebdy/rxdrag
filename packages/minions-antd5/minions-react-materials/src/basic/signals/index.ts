import { createId } from "@rxdrag/shared";
import { intervalSchema } from "./schema";
import { IIntervalConfig, Signals } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { IRxDragActivityMaterial } from "../../interfaces";
import { intervalIcon } from "@rxdrag/react-shared";

export const signalsMaterial: IRxDragActivityMaterial<IIntervalConfig> = {
  icon: intervalIcon,
  label: "$signals",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: Signals.INPUT_NAME_STARTUP,
        label: "$startUp",
      },
      {
        id: createId(),
        name: Signals.INPUT_NAME_STOP,
        label: "$stop",
      },
      {
        id: createId(),
        name: Signals.INPUT_NAME_INTERVAL,
        label: "$interval",
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
  schema: intervalSchema,
  subTitle: (config?: IIntervalConfig) => {
    if (config?.interval) {
      return config?.interval?.toString()
    }
  },
  activityName: Signals.NAME
}