import { IActivity, IActivityJointers, LogicFlow, Activity, IFxContext, ActivityJointers } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";

export interface IFxFlowConfig {
  fxId?: string
}

@Activity(FxFlow.NAME)
export class FxFlow implements IActivity {
  public static NAME = "system-react.fxflow"
  id: string;
  jointers: IActivityJointers = new ActivityJointers();
  config?: IFxFlowConfig;
  logicFlow?: LogicFlow;

  constructor(meta: INodeDefine<IFxFlowConfig>, context: IFxContext) {
    this.id = meta.id
    const defineMeta = context?.fxMetas?.find(fx => fx.id === meta?.config?.fxId)

    if (defineMeta) {
      this.logicFlow = new LogicFlow(defineMeta, context)
      this.jointers = this.logicFlow.jointers
    } else {
      console.error("Can not find fxFlow meta:" + meta?.config?.fxId)
    }
  }
  destroy(): void {
    this.logicFlow?.destroy();
    this.logicFlow = undefined;
  }
}