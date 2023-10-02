import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IControllerConfig, IControllerMeta, ReadRow } from "@rxdrag/minions-runtime-react"
import { IRxDragActivityMaterial } from "../../interfaces"
import { LogicflowContextParam } from "../../../types"
import { getControllerComponentInfo } from "../../controller/utils"
import { methodIcon } from "../../icons"

export const readRowMaterial: IRxDragActivityMaterial<IControllerConfig, LogicflowContextParam> = {
  label: "$readCurrentRow",
  activityType: NodeType.Activity,
  activityName: ReadRow.NAME,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "$readCurrentRow",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "$row",
      },
    ],
  },
  icon: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.icon || methodIcon
  },

  color: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.color
  },
  subTitle: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config?.param, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
}

