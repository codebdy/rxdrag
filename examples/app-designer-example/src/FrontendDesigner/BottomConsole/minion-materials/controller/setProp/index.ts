import { NodeType } from "@rxdrag/minions-schema";
import { propSchema } from "./schema"
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, SetProp } from "@rxdrag/minions-runtime-react";

import { IRxDragActivityMaterial } from "../../interfaces";
import { setPropIcon } from "../../../icons";
import { LogicflowContextParam } from "../../../types";
import { getControllerComponentInfo } from "../utils";

export const setPropMaterial: IRxDragActivityMaterial<IPropConfig, LogicflowContextParam> = {
  label: "$setProp",
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
  schema: propSchema,
  
  icon: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context)
    return material?.resource?.icon || setPropIcon
  },

  color: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context)
    return material?.resource?.color
  },

  title: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
  subTitle: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context)
    const prop = config?.param?.prop
    return material?.controller?.props?.find(pro => pro.name === prop)?.label || prop
  },
  activityName: SetProp.NAME,
}
