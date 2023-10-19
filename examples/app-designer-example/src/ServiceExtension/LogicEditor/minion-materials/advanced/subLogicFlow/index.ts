import { NodeType, ILogicFlowConfig } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { subLogicFlowSchema } from "./schema";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { ILogicFlowContext } from "../../../contexts";

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
    const subFlow = context?.subLogicFlows?.find(sub => sub.id === config?.param?.logicFlowId)
    return subFlow?.name || ""
  },
  schema: subLogicFlowSchema,
}
