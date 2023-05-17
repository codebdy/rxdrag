import { AbstractActivity, ActivityFactory } from "@rxdrag/minions"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IDebugConfig {
  closed?: boolean
}

export class DebugActivity extends AbstractActivity<IDebugConfig> {

  constructor(meta: IActivityDefine<IDebugConfig>) {
    super(meta)

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

export const Debug: ActivityFactory<IDebugConfig> = (meta: IActivityDefine<IDebugConfig>) => {
  return new DebugActivity(meta)
}

export const DebugActivityName = "debug"