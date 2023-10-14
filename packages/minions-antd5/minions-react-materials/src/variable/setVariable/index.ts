import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IVariableConfig, SetVariable } from "@rxdrag/minions-runtime-react"
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces"
import { variableIcon } from "@rxdrag/react-shared"

export const setVariableMaterial: IRxDragActivityMaterial<IVariableConfig, LogicflowContextParam> = {
  icon: variableIcon,
  label: "$setVariable",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },
  activityName: SetVariable.NAME,

  title: (config?: IVariableConfig, context?: LogicflowContextParam) => {
    return context?.variables?.find(v => v.id === config?.variable)?.name || config?.variable
  },
}

