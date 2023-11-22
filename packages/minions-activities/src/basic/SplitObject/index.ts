/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"


@Activity(SplitObject.NAME)
export class SplitObject extends AbstractActivity {
  public static NAME = "system.splitObject"

  constructor(meta: INodeDefine) {
    super(meta)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SplitArray inputs count error")
    }
  }

  @Input()
  inputHandler(inputValue?: any, runContext?: object): void {
    if (!inputValue) {
      return;
    }

    this.meta.outPorts?.forEach((port) => {
      if (port.name) {
        const value = inputValue[port.name]
        this.next(value, runContext, port.name)
      }
    })
  }
}
