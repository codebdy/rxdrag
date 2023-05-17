import { AbstractActivity } from "./AbstractActivity";

export class SingleInputActivity<ConfigMeta> extends AbstractActivity<ConfigMeta>{
  constructor(config: IDebugConfig) {
    super(config)


    this.getInputByName("input")?.connect(this.inputHandler as any)
  }
}