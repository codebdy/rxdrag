import { AbstractActivity, Activity } from "@rxdrag/minions-runtime";
import { ILogicFlowMetas } from "@rxdrag/minions-schema";

export interface IcustomizedLoopConifg {
  flowMetas?: ILogicFlowMetas
}

@Activity(CustomizedLoop.NAME)
export class CustomizedLoop extends AbstractActivity<IcustomizedLoopConifg> {
  public static NAME = "system.customizedLoop"
}