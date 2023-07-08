import { AbstractActivity, Activity } from "@rxdrag/minions-runtime";
import { ILogicFlowMetas } from "@rxdrag/minions-schema";

export interface IAdvancedLoopConifg {
  flowMetas?: ILogicFlowMetas
}

@Activity(AdvancedLoop.NAME)
export class AdvancedLoop extends AbstractActivity<IAdvancedLoopConifg> {
  public static NAME = "system.advancedLoop"
}