import { createUuid } from "@rxdrag/shared";
import { intervalSchema } from "./schema";
import { ReactNode } from "react";
import { IIntervalConfig, SignalsName } from "@rxdrag/minions-activities";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { intervalIcon } from "../../icons";

export const signalsMaterial: IActivityMaterial<ReactNode> = {
  icon: intervalIcon,
  label: "$signals",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "startUp",
        label: "$startUp",
      },
      {
        id: createUuid(),
        name: "stop",
        label: "$stop",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: intervalSchema,
  subTitle: (config?: IIntervalConfig) => {
    if (config?.interval) {
      return config?.interval?.toString()
    }
  },
  activityName: SignalsName
}