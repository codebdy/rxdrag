import { createUuid } from "@rxdrag/shared"
import { variableSchema } from "./schema"
import { ReactNode } from "react"
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema"
import { IVariableConfig, ListenVariableActivityName, ReadVariableActivityName, SetVariableActivityName } from "@rxdrag/minions-runtime-react"
import { setVariableIcon, listenVariableIcon, variableIcon } from "../../icons"

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
  icon: listenVariableIcon,
  label: "$listenVariable",
  activityType: ActivityType.Activity,
  defaultPorts: {
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
  activityName: ListenVariableActivityName,
}


export const readVariableMaterial: IActivityMaterial<ReactNode> = {
  icon: variableIcon,
  label: "$readVariable",
  activityType: ActivityType.Activity,
  defaultPorts: {
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
  activityName: ReadVariableActivityName,
}
