import { IReactionConfig, Reaction } from "@rxdrag/minions-runtime-react";
import { NodeType } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { reactionSchema } from "./schema";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";

export const reactionMaterial: IRxDragActivityMaterial<IReactionConfig, IControllerEditorContextParam> = {
  activityName: Reaction.NAME,
  icon: methodIcon,
  label: "$reaction",
  activityType: NodeType.LogicFlowActivity,
  defaultPorts: {
  },
  subTitle: (config?: IReactionConfig, context?: IControllerEditorContextParam) => {
    const controller = context?.controllers?.find(controller => controller.id === config?.param?.controllerId)
    const controllerName = controller?.name
    const reaction = controller?.reactions?.find(reaction => reaction.id === config?.param?.logicFlowId)
    return controllerName ? (controllerName + "/" + (reaction?.label || "")) : ""
  },
  schema: reactionSchema,
}
