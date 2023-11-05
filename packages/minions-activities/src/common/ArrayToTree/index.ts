import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IArrayToTreeConfig {
  parentField?: number
}

@Activity(ArrayToTree.NAME)
export class ArrayToTree extends AbstractActivity<IArrayToTreeConfig> {
  public static NAME = "system.ArrayToTree"

  constructor(meta: INodeDefine<IArrayToTreeConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any[], runContext?: object) => {
    //this.next(inputValue + this.meta.config?.step, runContext)
  }
}
