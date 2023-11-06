import { EventActivity, IControllerMeta, IEventConfig } from "@rxdrag/minions-runtime-react";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces";
import { getControllerComponentInfo } from "../utils";

export const eventMaterial: IRxDragActivityMaterial<IEventConfig, LogicflowContextParam> = {
  activityName: EventActivity.NAME,
  label: "$event",
  activityType: NodeType.Activity,
  defaultPorts: {
  },

  icon: (config?: IEventConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.icon
  },

  color: (config?: IEventConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.color
  },

  title: (config?: IEventConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
}
