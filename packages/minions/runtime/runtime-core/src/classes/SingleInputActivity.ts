import { IActivityDefine } from "@rxdrag/minions-schema";
import { AbstractActivity } from "./AbstractActivity";

export abstract class SingleInputActivity<ConfigMeta, LogicFlowContext = unknown> extends AbstractActivity<ConfigMeta, LogicFlowContext>{

  constructor(meta: IActivityDefine<ConfigMeta>, context?: LogicFlowContext) {
    super(meta, context)
  }

  connect(): void {
    this.jointers.getInput("input")?.connect(this.execute as any)
  }

  abstract execute(inputValue: any): void
}