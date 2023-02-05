import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface ISetPropConfig extends IConfigMeta {
  prop?: string
}

export class SetPropReaction extends AbstractReaction<ISetPropConfig> {

  constructor(meta: IReactionMeta<ISetPropConfig>, private options?: IReactionFactoryOptions) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }

    if(!options?.propsController){
      throw new Error("SetProp error: not set PropsController")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.prop) {
      this.options?.propsController?.setProp(this.meta.config.prop, inputValue)
    }
  }
}

export const SetProp: ReactionFactory = (meta: IReactionMeta<ISetPropConfig>, options?: IReactionFactoryOptions) => {
  return new SetPropReaction(meta)
}