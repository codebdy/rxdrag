import { IVariableConfig, ListenVariable } from "@rxdrag/minions-runtime-react"
import { NodeType } from "@rxdrag/minions-schema"
import { createId } from "@rxdrag/shared"
import { listenVariableIcon } from "../../icons"
import { variableSchema } from "../setVariable/schema"
import { IRxDragActivityMaterial } from "../../interfaces"
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor"

export const listenVariableMaterial: IRxDragActivityMaterial<IVariableConfig, IControllerEditorContextParam> = {
  icon: listenVariableIcon,
  label: "$listenVariable",
  activityType: NodeType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.param?.variable
  },
  activityName: ListenVariable.NAME,
}
