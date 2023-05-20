import { IActivityDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity, IControllerConfig } from "../AbstractControllerActivity";
import { activity } from "@rxdrag/minions-runtime";

export interface IVariableConfig extends IControllerConfig{
  variable?: string
}

export const SetVariableActivityName = "system-react.setVariable"
@activity(SetVariableActivityName)
export class SetVariableReaction extends AbstractControllerActivity<IVariableConfig> {
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetVariable inputs count error")
    }
    if (!meta.config?.controllerId) {
      throw new Error("SetVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  execute = (inputValue: string) => {
    if (this.meta.config?.variable) {
      this.controller?.setVariable(this.meta.config.variable, inputValue)
    }
  }
}
