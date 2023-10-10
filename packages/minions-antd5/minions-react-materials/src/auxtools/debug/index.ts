
import { createId } from "@rxdrag/shared";
import { debugSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { DebugActivity, IDebugConfig } from "@rxdrag/minions-activities"
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IRxDragActivityMaterial } from "../../interfaces";
import { debugIcon } from "@rxdrag/react-shared";

export const debugMaterial: IRxDragActivityMaterial<IDebugConfig> = {
  activityName: DebugActivity.NAME,
  icon: debugIcon,
  label: "$debug",
  activityType: NodeType.Activity,
  color: "orange",
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
  },
  subTitle: (config?: IDebugConfig) => {
    return config?.tip
  },
  schema: debugSchema,
}