import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"


@Activity(SplitArray.NAME)
export class SplitArray extends AbstractActivity {
  public static NAME = "system.splitArray"

  constructor(meta: INodeDefine) {
    super(meta)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SplitArray inputs count error")
    }
  }

  @Input()
  inputHandler(inputValue?: unknown[], runContext?: object): void {
    if (!inputValue) {
      return;
    }

    this.meta.outPorts?.forEach((port, index) => {
      if (port.name) {
        const value = inputValue[index]
        this.next(value, runContext, port.name)
      }
    })
  }
}
