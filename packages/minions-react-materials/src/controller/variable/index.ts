import { setVariableIcon, listenVariableIcon, variableIcon } from "@rxdrag/react-shared"
import { createUuid } from "@rxdrag/shared"
import { ListenVariable } from "./ListenVariableReaction"
import { ReadVariable } from "./ReadVariableReaction"
import { variableSchema } from "./schema"
import { IVariableConfig, SetVariable } from "./SetVariableReaction"
import { ReactNode } from "react"
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema"

export const setVariableMaterial: IActivityMaterial<ReactNode> = {
  icon: setVariableIcon,
  label: "$setVariable",
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
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  activityName: SetVariableActivityName,
}

export const listenVariableMaterial: IActivityMaterial<ReactNode> = {
  name: "listenVariable",
  icon: listenVariableIcon,
  label: "$listenVariable",
  activityType: ActivityType.ControllerDefaultReaction,
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
  activityType: ActivityType.ControllerDefaultReaction,
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
