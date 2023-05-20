import { IActivityDefine } from "@rxdrag/minions-schema"
import { IControllerContext } from "../../interfaces"
import { AbstractControllerActivity, IControllerConfig } from "../AbstractControllerActivity"
import { activity } from "@rxdrag/minions-runtime"

export const SetPropActivityName = "system-react.setProp"
export interface ISetPropConfig extends IControllerConfig {
  prop?: string,
}

@activity(SetPropActivityName)
export class SetPropActivity extends AbstractControllerActivity<ISetPropConfig> {
  constructor(meta: IActivityDefine<ISetPropConfig>, options?: IControllerContext) {
    super(meta, options)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  execute(inputValue: unknown): void {
    if (this.meta.config?.prop) {
      this.controller?.setProp(this.meta.config.prop, inputValue)
    }
  }
}
