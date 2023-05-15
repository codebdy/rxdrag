
import { randomIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { IRandomConfig, Random } from "./reaction";
import { randomSchema } from "./schema";
import { ReactNode } from "react";

export const randomMaterial: IActivityMaterial<ReactNode> = {
  name: "random",
  icon: randomIcon,
  label: "$random",
  reactionType: ActivityType.SingleActivity,
  meta: {
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
  reaction: Random,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue || config?.minValue) {
      return `${config.minValue || ""} ~ ${config.maxValue || ""}`
    }
  },
}