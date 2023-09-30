import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, ListenProp } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial } from "../../interfaces";
import { propSchema } from "../setProp/schema";
import { listenPropIcon } from "../../../icons";
import { LogicflowContextParam } from "../../../types";
import { getControllerComponentInfo } from "../utils";

export const listenPropMaterial: IRxDragActivityMaterial<IPropConfig, LogicflowContextParam> = {
  label: "$listenProp",
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
  schema: propSchema,
  icon: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context)
    return material?.resource?.icon || listenPropIcon
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
  activityName: ListenProp.NAME,
}
