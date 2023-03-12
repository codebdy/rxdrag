import { IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";
import { AbstractControllerReaction, IControllerReactionConfig } from "../AbstractControllerReaction";

export class SetPropReaction extends AbstractControllerReaction {

  constructor(meta: IReactionMeta<IControllerReactionConfig>, options?: IReactionFactoryOptions) {
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

export const SetProp: ReactionFactory = (meta: IReactionMeta<IControllerReactionConfig>, options?: IReactionFactoryOptions) => {
  return new SetPropReaction(meta, options)
}