import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { IControllerReactionConfig } from "../AbstractControllerReaction"
import { SetProp } from "./reaction"
import { setPropSchema } from "./schema"
import { ReactNode } from "react"
import { createUuid } from "@rxdrag/shared";
export const setPropMaterial: IActivityMaterial<ReactNode> = {
  name: "setProp",
  icon: setPropIcon,
  label: "$setProp",
  activityType: ActivityType.Activity,
  meta: {
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
  reaction: SetProp,
}
