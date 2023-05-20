
import { activity } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { AbstractControllerActivity, IControllerConfig } from "../AbstractControllerActivity";

export const SetPropActivityName = "system-react.setProp"
export interface ISetPropConfig extends IControllerConfig{
  prop?: string
}

@activity(SetPropActivityName)
export class SetPropActivity extends AbstractControllerActivity<ISetPropConfig> {
  constructor(meta: IActivityDefine<ISetPropConfig>, context: IControllerContext) {
    super(meta, context)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  execute = (inputValue: string) => {
    if (this.meta.config?.prop) {
      this.controller?.setProp(this.meta.config.prop, inputValue)
    }
  }
}
