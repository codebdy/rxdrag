import { IActivityDefine } from "@rxdrag/minions-schema";
import { AbstractActivity } from "./AbstractActivity";

export abstract class SingleInputActivity<ConfigMeta> extends AbstractActivity<ConfigMeta>{
  
  constructor(meta: IActivityDefine<ConfigMeta>) {
    super(meta)
  }

  connect(): void {
    this.jointers.getInputByName("input")?.connect(this.execute as any)
  }

  abstract execute(inputValue: any): void
}