import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor"
import { IVariableConfig, ReadVariableActivityName } from "@rxdrag/minions-runtime-react"
import { ActivityType } from "@rxdrag/minions-schema"
import { createUuid } from "@rxdrag/shared"
import { variableIcon } from "../../icons"
import { IRxDragActivityMaterial } from "../../interfaces"
import { variableSchema } from "../setVariable/schema"

export const readVariableMaterial: IRxDragActivityMaterial<IVariableConfig, IControllerEditorContextParam> = {
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
