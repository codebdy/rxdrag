
import { createUuid } from "@rxdrag/shared";
import { infoMessageSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IInfoMessageConfig, InfoMessage } from "@rxdrag/minions-react-antd5-activities"
import { infoIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";

export const infoMessageMaterial: IRxDragActivityMaterial<IInfoMessageConfig> = {
  icon: infoIcon,
  label: "$infoMessage",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
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