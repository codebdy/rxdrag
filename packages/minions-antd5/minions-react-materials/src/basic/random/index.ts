
import { createId } from "@rxdrag/shared";
import { randomSchema } from "./schema";
import { IRandomConfig, Random } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { randomIcon } from "@rxdrag/react-shared";

export const randomMaterial: IRxDragActivityMaterial<IRandomConfig> = {
  icon: randomIcon,
  label: "$random",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: Random.INPUT_NAME_STARTUP,
        label: "$startUp",
      },
      {
        id: createId(),
        name: Random.INPUT_NAME_MIN_VALUE,
        label: "$minValue",
      },
      {
        id: createId(),
        name: Random.INPUT_NAME_MAX_VALUE,
        label: "$maxValue",
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
  schema: randomSchema,
  activityName: Random.NAME,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue !== undefined || config?.minValue !== undefined) {
      return `${config.minValue === undefined ? "" : config.minValue} ~ ${config.maxValue === undefined ? "" : config.maxValue}`
    }
  },
}