import { intervalIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { IIntervalConfig, Interval } from "./reaction";
import { intervalSchema } from "./schema";
import { ReactNode } from "react";

export const intervalMaterial: IActivityMaterial<ReactNode> = {
  name: "interval",
  icon: intervalIcon,
  label: "$interval",
  reactionType: ActivityType.SingleActivity,
  meta: {
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
  reaction: Interval,
}