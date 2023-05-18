import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const ConstActivityName = "system.constValue"

export interface IConstValueConfig {
  value?: any,
}

@activity(ConstActivityName)
export class ConstValue extends SingleInputActivity<IConstValueConfig> {

  constructor(meta: IActivityDefine<IConstValueConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Fixed value inputs count error")
    }
  }

  execute(inputValue: any): void {
    this.next(this.meta.config?.value)
  }
}