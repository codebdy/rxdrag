import { createUuid } from "@rxdrag/shared";
import { intervalSchema } from "./schema";
import { ReactNode } from "react";
import { IIntervalConfig, Signals } from "@rxdrag/minions-activities";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { intervalIcon } from "../../icons";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const signalsMaterial: IActivityMaterial<ReactNode> = {
  icon: intervalIcon,
  label: "$signals",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: Signals.INPUT_NAME_STARTUP,
        label: "$startUp",
      },
      {
        id: createUuid(),
        name: Signals.INPUT_NAME_STOP,
        label: "$stop",
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
  schema: intervalSchema,
  subTitle: (config?: IIntervalConfig) => {
    if (config?.interval) {
      return config?.interval?.toString()
    }
  },
  activityName: Signals.NAME
}