
import { Activity, Input } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { IReactContext } from "@rxdrag/minions-runtime-react";

export interface IPropConfig extends IControllerConfig {
  prop?: string
}

@Activity(SetProp.NAME)
export class SetProp extends ControllerActivity<IPropConfig> {
  public static NAME = "system-react.setProp"
  constructor(meta: INodeDefine<IPropConfig>, context: IReactContext) {
    super(meta, context)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  @Input()
  inputHandler = (inputValue: string, runContext?: object) => {
    if (this.meta.config?.prop) {
      this.controller?.setProp(this.meta.config?.prop, inputValue)
    }
    this.next(inputValue, runContext);
  }
}
