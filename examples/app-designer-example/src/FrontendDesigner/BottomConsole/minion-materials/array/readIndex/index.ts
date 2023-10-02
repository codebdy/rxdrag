import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IControllerConfig, IControllerMeta, ReadIndex } from "@rxdrag/minions-runtime-react"
import { IRxDragActivityMaterial } from "../../interfaces"
import { LogicflowContextParam } from "../../../types"
import { getControllerComponentInfo } from "../../controller/utils"
import { methodIcon } from "../../icons"

export const readIndexMaterial: IRxDragActivityMaterial<IControllerConfig, LogicflowContextParam> = {
  label: "$readCurrentIndex",
  activityType: NodeType.Activity,
  activityName: ReadIndex.NAME,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "$readCurrentIndex",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "$index",
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

