
import { SingleInputActivity, activity } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { ControllerReactionFactoryOptions } from "../hooks/useFactoryOptions";

export const SetPropActivityName = "system-react.setProp"
export interface ISetPropConfig {
  prop?: string
}

@activity(SetPropActivityName)
export class SetProp extends SingleInputActivity<ISetPropConfig, ControllerReactionFactoryOptions> {
  constructor(meta: IActivityDefine<ISetPropConfig>, options: ControllerReactionFactoryOptions) {
    super(meta, options)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }
  }

  execute = (inputValue: string) => {
    if (this.meta.config?.prop) {
      this.context?.controller?.setProp(this.meta.config.prop, inputValue)
    }
  }
}
