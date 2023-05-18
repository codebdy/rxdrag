import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const DebugActivityName = "debug"

export interface IDebugConfig {
  tip?: string,
  closed?: boolean
}

@activity(DebugActivityName)
export class DebugActivity extends SingleInputActivity<IDebugConfig> {

  constructor(meta: IActivityDefine<IDebugConfig>) {
    super(meta)
  }

  execute(inputValue: any): void {
    if (!this.config?.closed) {
      console.log(`🪲${this.config?.tip || "Debug"}:`, inputValue)
    }
  }
}
