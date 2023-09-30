import { IActivity, IActivityJointers, LogicFlow, Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { IControllerConfig, IControllerParam } from "../AbstractControllerActivity";

export interface IEventParam extends IControllerParam {
  logicFlowId?: string
}

export interface IEventConfig extends IControllerConfig {
  param?: IEventParam
}

@Activity(EventActivity.NAME)
export class EventActivity implements IActivity {
  public static NAME = "system-react.event"
  id: string;
  jointers: IActivityJointers;
  config?: IEventConfig;
  logicFlow?: LogicFlow;

  constructor(meta: INodeDefine<IEventConfig>, context: IControllerContext) {
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