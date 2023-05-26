
import { createUuid } from "@rxdrag/shared";
import { randomSchema } from "./schema";
import { ReactNode } from "react";
import { IRandomConfig, RandomActivityName } from "@rxdrag/minions-activities";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { randomIcon } from "../../icons";

export const randomMaterial: IActivityMaterial<ReactNode> = {
  icon: randomIcon,
  label: "$random",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "startUp",
        label: "",//"$startUp",
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
  schema: randomSchema,
  activityName: RandomActivityName,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue || config?.minValue) {
      return `${config.minValue || ""} ~ ${config.maxValue || ""}`
    }
  },
}