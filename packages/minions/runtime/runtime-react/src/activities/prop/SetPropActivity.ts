
import { Activity, Input } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { AbstractControllerActivity, IControllerConfig, IControllerParam } from "../AbstractControllerActivity";

export interface IPropParam extends IControllerParam {
  prop?: string
}

export interface ISetPropConfig extends IControllerConfig {
  param?: IPropParam
}

@Activity(SetPropActivity.NAME)
export class SetPropActivity extends AbstractControllerActivity<ISetPropConfig> {
  public static NAME = "system-react.setProp"
  constructor(meta: IActivityDefine<ISetPropConfig>, context: IControllerContext) {
    super(meta, context)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  @Input()
  inputHandler = (inputValue: string) => {
    if (this.meta.config?.param?.prop) {
      this.controller?.setProp(this.meta.config?.param.prop, inputValue)
    }
  }
}
