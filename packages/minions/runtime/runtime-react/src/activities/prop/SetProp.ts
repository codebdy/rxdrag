
import { Activity, Input } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IController } from "../../interfaces";
import { AbstractControllerActivity, IControllerConfig, IControllerParam } from "../AbstractControllerActivity";

export interface IPropParam extends IControllerParam {
  prop?: string
}

export interface IPropConfig extends IControllerConfig {
  param?: IPropParam
}

@Activity(SetProp.NAME)
export class SetProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.setProp"
  constructor(meta: INodeDefine<IPropConfig>, controller: IController) {
    super(meta, controller)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  @Input()
  inputHandler = (inputValue: string) => {
    if (this.meta.config?.param?.prop) {
      this.controller?.setProp(this.meta.config?.param.prop, inputValue)
    }
    this.next(inputValue);
  }
}
