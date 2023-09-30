import { IControllerMeta, IEventConfig, IReactionConfig, Reaction } from "@rxdrag/minions-runtime-react";
import { NodeType } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { LogicflowContextParam } from "../../../types";
import { getControllerComponentInfo } from "../utils";

export const reactionMaterial: IRxDragActivityMaterial<IEventConfig, LogicflowContextParam> = {
  activityName: Reaction.NAME,
  label: "$reaction",
  activityType: NodeType.Activity,
  defaultPorts: {
  },

  icon: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.icon || methodIcon
  },

  color: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.color
  },

  title: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config?.param, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },

}
