import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IConstValueConfig {
  value?: any,
}

@Activity(ConstValue.NAME)
export class ConstValue extends AbstractActivity<IConstValueConfig> {
  public static NAME = "system.constValue"

  constructor(meta: INodeDefine<IConstValueConfig>) {
    super(meta)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Fixed value inputs count error")
    }
  }

  @Input()
  inputHandler = (_: unknown, runContext?: object): void => {
    this.next(this.meta.config?.value, runContext)
  }
}