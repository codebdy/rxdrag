import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IDebugConfig {
  tip?: string,
  closed?: boolean
}

@Activity(Debug.NAME)
export class Debug extends AbstractActivity<IDebugConfig> {
  public static NAME = "system.debug"

  constructor(meta: INodeDefine<IDebugConfig>) {
    super(meta)
  }

  @Input()
  inputHandler(inputValue: unknown): void {
    if (!this.config?.closed) {
      console.log(`🪲${this.config?.tip || "Debug"}:`, inputValue)
    }
  }
}

