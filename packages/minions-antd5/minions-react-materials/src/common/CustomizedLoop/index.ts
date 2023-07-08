import { ActivityType } from "@rxdrag/minions-schema";
import { IInfoMessageConfig, InfoMessage } from "@rxdrag/minions-react-antd5-activites"
import { addvanceLoopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { CustomizedLoop } from "@rxdrag/minions-activities";
import { createUuid } from "@rxdrag/shared";
import { customizedLoopSchema } from "./schema";

export const customizedLoopMaterial: IRxDragActivityMaterial<IInfoMessageConfig> = {
  icon: addvanceLoopIcon,
  label: "$customizedLoop",
  activityType: ActivityType.EmbeddedFlow,
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
        label: "$oneOutput",
      },
      {
        id: createUuid(),
        name: "finished",
        label: "$finished",
      },
    ],
  },
  schema: customizedLoopSchema,
  activityName: CustomizedLoop.NAME,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}