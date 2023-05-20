
import { infoIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { infoMessageSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { MessageActivityName, IInfoMessageConfig } from "@rxdrag/minions-react-antd5-activites"

export const infoMessageMaterial: IActivityMaterial<ReactNode> = {
  icon: infoIcon,
  label: "$infoMessage",
  activityType: ActivityType.Activity,
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
  activityName: MessageActivityName,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}