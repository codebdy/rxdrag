import { IActivityDefine } from "@rxdrag/minions-schema";
import { AbstractActivity } from "./AbstractActivity";

export abstract class SingleInputActivity<ConfigMeta, FactoryOptions=unknown> extends AbstractActivity<ConfigMeta>{

  constructor(meta: IActivityDefine<ConfigMeta>, options?: FactoryOptions) {
    super(meta, options)
  }

  connect(): void {
    this.jointers.getInput("input")?.connect(this.execute as any)
  }

  abstract execute(inputValue: any): void
}