import { AbstractActivity, ActivityFactory } from "@rxdrag/minions"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IDebugConfig {
  tip?:string,
  closed?: boolean
}

export class DebugActivity extends SingleInputActivity<IDebugConfig> {

  constructor(config: IDebugConfig) {
    super(config)


    this.getInputByName("input")?.connect(this.inputHandler as any)
  }

  inputHandler = (inputValue: string) => {
    if (!this.config?.closed) {
      console.log(`🪲${this.config.label || "Debug"}:`, inputValue)
    }
  }
}

export const Debug: ActivityFactory<IDebugConfig> = (meta: IActivityDefine<IDebugConfig>) => {
  return new DebugActivity(meta)
}

export const DebugActivityName = "debug"