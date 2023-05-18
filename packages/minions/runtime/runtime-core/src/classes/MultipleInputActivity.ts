import { IActivityDefine } from "@rxdrag/minions-schema";
import { AbstractActivity } from "./AbstractActivity";

export class MultipleInputActivity<ConfigMeta> extends AbstractActivity<ConfigMeta>{
  constructor(meta: IActivityDefine<ConfigMeta>) {
    super(meta)
  }

  connect(): void {
    this.jointers.getInputByName("input")?.connect(this.execute as any)
  }


  next(inputValue: unknown, outputName:string = "output"){
    this.jointers.getInputByName(outputName)?.push(inputValue)
  }
}