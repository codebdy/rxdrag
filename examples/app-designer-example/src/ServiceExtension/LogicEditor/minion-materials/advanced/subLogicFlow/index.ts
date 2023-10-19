import { NodeType, ILogicFlowConfig } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { subLogicFlowSchema } from "./schema";
import { ILogicFlowContext } from "UmlEditor/LogicEditor/contexts";

// export interface ISubLogicFlowConfig{
//   subFlowId?:string
// }

export const subLogicFlowMaterial: IRxDragActivityMaterial<ILogicFlowConfig, ILogicFlowContext> = {
  activityName: "subLogicFlow",
  icon: methodIcon,
  label: "$subLogicFlow",
  activityType: NodeType.LogicFlowActivity,
  defaultPorts: {
  },
  subTitle: (config?: ILogicFlowConfig, context?: ILogicFlowContext) => {
    const subFlow = context?.subLogicFlows?.find(sub => sub.uuid === config?.param?.logicFlowId)
    return subFlow?.name || ""
  },
  schema: subLogicFlowSchema,
}
