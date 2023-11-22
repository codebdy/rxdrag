import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { NodeType } from "@rxdrag/minions-schema";
import { methodIcon } from "@rxdrag/react-shared";
import { ILogicFlowContext } from "../../contexts";

export interface IFxFlowConfig {
  fxId?: string
}
export const fxFlowMaterial: IRxDragActivityMaterial<IFxFlowConfig, ILogicFlowContext> = {
  activityName: "fxFlow",
  label: "$fxFlow",
  icon: methodIcon,
  color: "#58c622",
  activityType: NodeType.LogicFlowActivity,
  defaultPorts: {
  },

  title: (config?: IFxFlowConfig, context?: ILogicFlowContext) => {
    const fx = context?.fxFlowMetas?.find(fx => config?.fxId === fx.id)
    return fx?.name || fx?.id
  },

}
