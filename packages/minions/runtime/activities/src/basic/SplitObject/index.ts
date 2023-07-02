import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"


@Activity(SplitObject.NAME)
export class SplitObject extends AbstractActivity {
  public static NAME = "system.splitObject"

  constructor(meta: IActivityDefine) {
    super(meta)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SplitArray inputs count error")
    }
  }

  @Input()
  inputHandler(inputValue?: any): void {
    if (!inputValue) {
      return;
    }

    this.meta.outPorts?.forEach((port) => {
      if (port.name) {
        const value = inputValue[port.name]
        this.next(value, port.name)
      }
    })
  }
}
