import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IConstValueConfig {
  value?: any,
}

@Activity(ConstValue.NAME)
export class ConstValue extends AbstractActivity<IConstValueConfig> {
  public static NAME = "system.constValue"

  constructor(meta: IActivityDefine<IConstValueConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Fixed value inputs count error")
    }
  }

  @Input()
  inputHandler(): void {
    this.next(this.meta.config?.value)
  }
}