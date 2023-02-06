import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IVariableConfig extends IConfigMeta {
  variable?: string
}

export class SetVariableReaction extends AbstractReaction<IVariableConfig> {

  constructor(meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetProp inputs count error")
    }

    if(!options?.variableController){
      throw new Error("SetProp error: not set variableController")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.variable) {
      this.options?.variableController?.setVariable(this.meta.config.variable, inputValue)
    }
  }
}

export const SetVariable: ReactionFactory = (meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) => {
  return new SetVariableReaction(meta, options)
}