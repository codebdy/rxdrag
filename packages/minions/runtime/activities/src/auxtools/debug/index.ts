import { SingleInputActivity, Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IDebugConfig {
  tip?: string,
  closed?: boolean
}

@Activity(Debug.NAME)
export class Debug extends AbstractActivity<IDebugConfig> {
  public static NAME = "system.debug"

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

