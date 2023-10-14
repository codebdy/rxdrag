import { IControllerMeta, IReactionConfig, Reaction } from "@rxdrag/minions-runtime-react";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces";
import { getControllerComponentInfo } from "../utils";
import { methodIcon } from "@rxdrag/react-shared";

export const reactionMaterial: IRxDragActivityMaterial<IReactionConfig, LogicflowContextParam> = {
  activityName: Reaction.NAME,
  label: "$reaction",
  activityType: NodeType.Activity,
  defaultPorts: {
  },

  icon: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.icon || methodIcon
  },

  color: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.color
  },

  title: (config?: IReactionConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },

}
