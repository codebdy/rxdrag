
import { createId } from "@rxdrag/shared";
import { infoMessageSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IInfoMessageConfig, InfoMessage } from "@rxdrag/minions-activities"
import { IRxDragActivityMaterial } from "../../interfaces";
import { infoIcon } from "@rxdrag/react-shared";

export const infoMessageMaterial: IRxDragActivityMaterial<IInfoMessageConfig> = {
  icon: infoIcon,
  label: "$infoMessage",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: infoMessageSchema,
  activityName: InfoMessage.NAME,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}