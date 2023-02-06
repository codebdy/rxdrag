import { AbstractReaction, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";
import { IVariableConfig } from "./SetVariableReaction";

export class ListenVariableReaction extends AbstractReaction<IVariableConfig> {
  constructor(meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.outPorts || {}).length !== 1) {
      throw new Error("ListenVariable outputs count error")
    }

    if (!options?.variableController) {
      throw new Error("SetProp error: not set variableController")
    }
    if(meta.config?.variable){
      options?.variableController?.subscribeToVariableChange(meta.config?.variable, this.outputHandler)
    }else{
      console.error("Not set variable to ListenVariableReaction")
    }
  }

  outputHandler = (inputValue: string) => {
    if (this.meta.config?.variable) {
      this.getOutputById("output")?.push(inputValue)
    }
  }
}

export const ListenVariable: ReactionFactory = (meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) => {
  return new ListenVariableReaction(meta, options)
}