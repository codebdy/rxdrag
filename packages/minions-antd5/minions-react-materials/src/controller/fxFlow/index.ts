import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces";

import { methodIcon } from "@rxdrag/react-shared";
import { FxFlow, IFxFlowConfig } from "@rxdrag/minions-activities";

export const fxFlowMaterial: IRxDragActivityMaterial<IFxFlowConfig, LogicflowContextParam> = {
  activityName: FxFlow.NAME,
  label: "$fxFlow",
  icon: methodIcon,
  color: "#58c622",
  activityType: NodeType.LogicFlowActivity,
  defaultPorts: {
  },

  title: (config?: IFxFlowConfig, context?: LogicflowContextParam) => {
    const fx = context?.fxFlowMetas?.find(fx => config?.fxId === fx.id)
    return fx?.label || fx?.name || fx?.id
  },

}
