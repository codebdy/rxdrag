import { IReactionMeta } from "runner/minions";
import { IComponentController, IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";
import { AbstractControllerReaction } from "../AbstractControllerReaction";
import { IVariableConfig } from "./SetVariableReaction";

export class ReadVariableReaction extends AbstractControllerReaction {
  controller: IComponentController
  constructor(meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
    if(!meta.config?.controllerId){
      throw new Error("ReadVariable not set controller id")
    }
    const controller = options?.controllers?.[meta.config?.controllerId]
    if(!controller){
      throw new Error("Can not find controller")
    }
    this.controller = controller

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.variable) {
      this.getOutputByName("output")?.push(this.controller.getVariable(this.meta.config.variable))
    }
  }
}

export const ReadVariable: ReactionFactory = (meta: IReactionMeta<IVariableConfig>, options?: IReactionFactoryOptions) => {
  return new ReadVariableReaction(meta, options)
}