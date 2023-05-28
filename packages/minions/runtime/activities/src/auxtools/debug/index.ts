import { SingleInputActivity, Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const DebugActivityName = "system.debug"

export interface IDebugConfig {
  tip?: string,
  closed?: boolean
}

@Activity(DebugActivityName)
export class Debug extends AbstractActivity<IDebugConfig> {

  constructor(meta: IActivityDefine<IDebugConfig>) {
    super(meta)
  }

  @Input()
  execute(inputValue: any): void {
    if (!this.config?.closed) {
      console.log(`🪲${this.config?.tip || "Debug"}:`, inputValue)
    }
  }

  @Input("input2")
  input2Handler(){

  }
}

