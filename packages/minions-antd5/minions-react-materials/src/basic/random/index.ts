
import { createUuid } from "@rxdrag/shared";
import { randomSchema } from "./schema";
import { IRandomConfig, Random } from "@rxdrag/minions-activities";
import { ActivityType } from "@rxdrag/minions-schema";
import { randomIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const randomMaterial: IRxDragActivityMaterial<IRandomConfig> = {
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
  activityName: Random.NAME,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue || config?.minValue) {
      return `${config.minValue || ""} ~ ${config.maxValue || ""}`
    }
  },
}