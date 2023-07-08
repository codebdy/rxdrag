import { advancedLoopSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { IInfoMessageConfig, InfoMessage } from "@rxdrag/minions-react-antd5-activites"
import { addvanceLoopIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { AdvancedLoop } from "@rxdrag/minions-activities";

export const advancedLoopMaterial: IRxDragActivityMaterial<IInfoMessageConfig> = {
  icon: addvanceLoopIcon,
  label: "$advancedLoop",
  activityType: ActivityType.EmbeddedFlow,
  defaultPorts: {
  },
  schema: advancedLoopSchema,
  activityName: AdvancedLoop.NAME,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}