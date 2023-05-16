
import { infoIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { IInfoMessageConfig, InfoMessage } from "./reaction";
import { infoMessageSchema } from "./schema";
import { ReactNode } from "react";

export const infoMessageMaterial: IActivityMaterial<ReactNode> = {
  name: "infoMessage",
  icon: infoIcon,
  label: "$infoMessage",
  reactionType: ActivityType.SingleActivity,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: infoMessageSchema,
  reaction: InfoMessage,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}