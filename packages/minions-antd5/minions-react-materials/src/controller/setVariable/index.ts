import { createId } from "@rxdrag/shared"
import { variableSchema } from "./schema"
import { NodeType } from "@rxdrag/minions-schema"
import { IVariableConfig, SetVariable } from "@rxdrag/minions-runtime-react"
import { setVariableIcon } from "../../icons"
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor"
import { IRxDragActivityMaterial } from "../../interfaces"

export const setVariableMaterial: IRxDragActivityMaterial<IVariableConfig, IControllerEditorContextParam> = {
  icon: setVariableIcon,
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
  schema: variableSchema,
  subTitle: (config?: IVariableConfig, context?: IControllerEditorContextParam) => {
    const controllerName = context?.controllers?.find(controller => controller.id === config?.param?.controllerId)?.name
    return controllerName ? (controllerName + "/" + (config?.param?.variable || "")) : ""
  },
  activityName: SetVariable.NAME,
}

