import { delayIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { delaySchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { DelayActivityName, IDelayConfig } from "@rxdrag/minions-activities";

export const delayMaterial: IActivityMaterial<ReactNode> = {
  icon: delayIcon,
  label: "$delay",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
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
  activityName: DelayActivityName
}