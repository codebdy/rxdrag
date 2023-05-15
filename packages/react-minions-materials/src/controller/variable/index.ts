import { setVariableIcon, listenVariableIcon, variableIcon } from "@rxdrag/react-shared"
import { IActivityMaterial, ActivityType } from "@rxdrag/schema"
import { createUuid } from "@rxdrag/shared"
import { ListenVariable } from "./ListenVariableReaction"
import { ReadVariable } from "./ReadVariableReaction"
import { variableSchema } from "./schema"
import { IVariableConfig, SetVariable } from "./SetVariableReaction"
import { ReactNode } from "react"

export const setVariableMaterial: IActivityMaterial<ReactNode> = {
  name: "setVariable",
  icon: setVariableIcon,
  label: "$setVariable",
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
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: SetVariable,
}

export const listenVariableMaterial: IActivityMaterial<ReactNode> = {
  name: "listenVariable",
  icon: listenVariableIcon,
  label: "$listenVariable",
  reactionType: ActivityType.ControllerDefaultReaction,
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
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: ListenVariable,
}


export const readVariableMaterial: IActivityMaterial<ReactNode> = {
  name: "readVariable",
  icon: variableIcon,
  label: "$readVariable",
  reactionType: ActivityType.ControllerDefaultReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: ReadVariable,
}
