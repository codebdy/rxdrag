import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { listenVariableIcon, setPropIcon } from "../../icons/reactions";
import { createUuid } from "../../SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { reactionMaterial } from "./reaction";
import { setVariableMaterial } from "./setProp";
import { setPropSchema } from "./setProp/schema";
import { variableSchema } from "./setVariable/schema";

export const listenVariableMaterial: IReactionMaterial = {
  name: "listenVariable",
  icon: listenVariableIcon,
  label: "$listenVariable",
  reactionType: ReactionType.ControllerDefaultReaction,
  meta: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$startUp",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: any) => {
    return config?.variable
  }
}

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
  subTitle: (config?: any) => {
    return config?.prop
  }
}

export const controllerReactions: IReactionMaterial[] = [
  setVariableMaterial,
  listenVariableMaterial,
  setPropMaterial,
  reactionMaterial
]
