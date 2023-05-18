import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { IControllerReactionConfig } from "../AbstractControllerReaction"
import { setPropSchema } from "./schema"
import { ReactNode } from "react"
import { createUuid } from "@rxdrag/shared";
import { setPropIcon } from "@rxdrag/react-shared";
import { SetPropActivityName } from "@rxdrag/minions-runtime-react";

export const setPropMaterial: IActivityMaterial<ReactNode> = {
  icon: setPropIcon,
  label: "$setProp",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$startUp",
      },
    ],
  },
  schema: setPropSchema,
  subTitle: (config?: IControllerReactionConfig) => {
    return config?.prop
  },
  activityName: SetPropActivityName,
}
