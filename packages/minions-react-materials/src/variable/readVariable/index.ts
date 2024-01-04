import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces"
import { variableIcon } from "@rxdrag/react-shared"
import { IVariableConfig, ReadVariable } from "@rxdrag/minions-activities"

export const readVariableMaterial: IRxDragActivityMaterial<IVariableConfig, LogicflowContextParam> = {
  icon: variableIcon,
  label: "$readVariable",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "$read",
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
  activityName: ReadVariable.NAME,

  title: (config?: IVariableConfig, context?: LogicflowContextParam) => {
    return context?.variables?.find(v => v.id === config?.variable)?.name || config?.variable
  },
}

