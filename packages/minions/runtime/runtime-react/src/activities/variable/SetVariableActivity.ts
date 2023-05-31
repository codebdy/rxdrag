import { IActivityDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity, IControllerConfig, IControllerParam } from "../AbstractControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";

export interface IVirableParam extends IControllerParam {
  variable?: string
}

export interface IVariableConfig extends IControllerConfig {
  param?: IVirableParam
}

@Activity(SetVariableActivity.NAME)
export class SetVariableActivity extends AbstractControllerActivity<IVariableConfig> {
  public static NAME = "system-react.setVariable"
  
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetVariable inputs count error")
    }
    if (!meta.config?.param?.controllerId) {
      throw new Error("SetVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }
  @Input()
  inputHandler = (inputValue: string) => {
    if (this.meta.config?.param?.variable) {
      this.controller?.setVariable(this.meta.config.param?.variable, inputValue)
    }
  }
}
