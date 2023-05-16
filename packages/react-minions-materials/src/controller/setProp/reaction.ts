
import { IActivityFactoryOptions } from "@rxdrag/minions";
import { IActivityDefine, ActivityFactory } from "@rxdrag/schema";
import { AbstractControllerReaction, IControllerReactionConfig } from "../AbstractControllerReaction";

export class SetPropReaction extends AbstractControllerReaction {

  constructor(meta: IActivityDefine<IControllerReactionConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.prop) {
      this.controller?.setProp(this.meta.config.prop, inputValue)
    }
  }
}

export const SetProp: ActivityFactory = (meta: IActivityDefine<IControllerReactionConfig>, options?: IActivityFactoryOptions) => {
  return new SetPropReaction(meta, options)
}