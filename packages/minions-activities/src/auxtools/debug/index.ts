import { AbstractActivity, ActivityFactory } from "@rxdrag/minions"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IDebugConfig {
  closed?: boolean
}

export class DebugReaction extends AbstractActivity<IDebugConfig, unknown> {

  constructor(meta: IActivityDefine<IDebugConfig>, options?: unknown) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler as any)
  }

  inputHandler = (inputValue: string) => {
    if (!this.meta.config?.closed) {
      console.log(`🪲${this.meta.label || "Debug"}:`, inputValue)
    }
  }
}

export const Debug: ActivityFactory<unknown, IDebugConfig> = (meta: IActivityDefine<IDebugConfig>, options?: unknown) => {
  return new DebugReaction(meta, options)
}

export const DebugActivityName = "debug"