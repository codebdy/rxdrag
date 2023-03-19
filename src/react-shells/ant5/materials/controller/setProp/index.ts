import { setPropIcon } from "react-shells/ant5/icons/reactions"
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { IReactionMaterial, ReactionType } from "runner/minions"
import { IControllerReactionConfig } from "../AbstractControllerReaction"
import { SetProp } from "./reaction"
import { setPropSchema } from "./schema"

export const setPropMaterial: IReactionMaterial = {
  name: "setProp",
  icon: setPropIcon,
  label: "$setProp",
  reactionType: ReactionType.ControllerDefaultReaction,
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
