import { IVariableConfig, ListenVariableActivity } from "@rxdrag/minions-runtime-react"
import { ActivityType } from "@rxdrag/minions-schema"
import { createUuid } from "@rxdrag/shared"
import { listenVariableIcon } from "../../icons"
import { variableSchema } from "../setVariable/schema"
import { IRxDragActivityMaterial } from "../../interfaces"
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor"

export const listenVariableMaterial: IRxDragActivityMaterial<IVariableConfig, IControllerEditorContextParam> = {
  icon: listenVariableIcon,
  label: "$listenVariable",
  activityType: ActivityType.Activity,
  defaultPorts: {
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
    return config?.param?.variable
  },
  activityName: ListenVariableActivity.NAME,
}
