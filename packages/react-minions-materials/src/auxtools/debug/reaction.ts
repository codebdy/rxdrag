import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"
import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"

export interface IDebugConfig extends IConfigMeta {
  closed?: boolean
}

export class DebugReaction extends AbstractActivity<IDebugConfig> {

  constructor(meta: IActivityDefine<IDebugConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (!this.meta.config?.closed) {
      console.log(`🪲${this.meta.label || "Debug"}:`, inputValue)
    }
  }
}

export const Debug: ActivityFactory = (meta: IActivityDefine<IDebugConfig>, options?: IActivityFactoryOptions) => {
  return new DebugReaction(meta, options)
}