import { setVariableIcon } from "react-shells/ant5/icons/reactions"
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { IReactionMaterial, ReactionType } from "runner/reaction"
import { variableSchema } from "../setVariable/schema"
import { SetProp } from "./reaction"

export const setVariableMaterial: IReactionMaterial = {
  name: "setVariable",
  icon: setVariableIcon,
  label: "$setVariable",
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
  schema: variableSchema,
  subTitle: (config?: any) => {
    return config?.variable
  },
  reactionFactory: SetProp,
}
