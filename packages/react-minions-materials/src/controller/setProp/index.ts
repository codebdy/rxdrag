import { setPropIcon } from "@rxdrag/react-shared"
import { IActivityMaterial, ActivityType } from "@rxdrag/schema"
import { createUuid } from "@rxdrag/shared"
import { IControllerReactionConfig } from "../AbstractControllerReaction"
import { SetProp } from "./reaction"
import { setPropSchema } from "./schema"
import { ReactNode } from "react"

export const setPropMaterial: IActivityMaterial<ReactNode> = {
  name: "setProp",
  icon: setPropIcon,
  label: "$setProp",
  reactionType: ActivityType.ControllerDefaultReaction,
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
