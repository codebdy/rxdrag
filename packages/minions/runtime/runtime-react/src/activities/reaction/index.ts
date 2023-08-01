import { IActivity, IActivityJointers, LogicFlow, Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { IControllerConfig, IControllerParam } from "../AbstractControllerActivity";

export interface IReactionParam extends IControllerParam {
  logicFlowId?: string
}

export interface IReactionConfig extends IControllerConfig {
  param?: IReactionParam
}

@Activity(Reaction.NAME)
export class Reaction implements IActivity {
  public static NAME = "system-react.reaction"
  id: string;
  jointers: IActivityJointers;
  config?: IReactionConfig;
  logicFlow?: LogicFlow;

  constructor(meta: INodeDefine<IReactionConfig>, context: IControllerContext) {
    this.id = meta.id
    const defineMeta = context?.controllers?.[meta?.config?.param?.controllerId || ""]?.meta.reactions?.find(reactionMeta => reactionMeta.id === meta.config?.param?.logicFlowId)
    if (defineMeta) {
      this.logicFlow = new LogicFlow(defineMeta, context)
      this.jointers = this.logicFlow.jointers
    } else {
      throw new Error("No implement on Controller reaction meta")
    }
  }
  destroy(): void {
    this.logicFlow?.destroy();
    this.logicFlow = undefined;
  }
}