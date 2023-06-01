import { IActivity, IActivityJointers, LogicFlow, Activity } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
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

  constructor(meta: IActivityDefine<IReactionConfig>, context: IControllerContext) {
    this.id = meta.id
    const defineMeta = context?.controllers?.[meta?.config?.param?.controllerId || ""]?.meta.reactions?.find(reactionMeta => reactionMeta.id === meta.config?.param?.logicFlowId)
    if (defineMeta) {
      this.logicFlow = new LogicFlow(defineMeta, context)
      this
      this.jointers = this.logicFlow.jointers
    } else {
      throw new Error("No implement on Controller reaction meta")
    }
  }
  destory(): void {
    this.logicFlow?.destory();
    this.logicFlow = undefined;
  }
}