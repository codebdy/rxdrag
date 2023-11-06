import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IControllerConfig, IControllerMeta, ReadIndex } from "@rxdrag/minions-runtime-react"
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces"
import { getControllerComponentInfo } from "../../controller/utils"
import { numIcon } from "@rxdrag/react-shared"

export const readIndexMaterial: IRxDragActivityMaterial<IControllerConfig, LogicflowContextParam> = {
  label: "$readCurrentIndex",
  icon: numIcon,
  activityType: NodeType.Activity,
  activityName: ReadIndex.NAME,
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

  color: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.color
  },

  subTitle: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
}

