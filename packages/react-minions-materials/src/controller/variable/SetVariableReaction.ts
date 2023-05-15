import { IController, IActivityFactoryOptions } from "@rxdrag/minions";
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema";
import { AbstractControllerReaction } from "../AbstractControllerReaction";

export interface IVariableConfig extends IConfigMeta {
  variable?: string
}

export class SetVariableReaction extends AbstractControllerReaction {
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetVariable inputs count error")
    }
    if(!meta.config?.controllerId){
      throw new Error("SetVariable not set controller id")
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
      this.controller?.setVariable(this.meta.config.variable, inputValue)
    }
  }
}

export const SetVariable: ActivityFactory = (meta: IActivityDefine<IVariableConfig>, options?: IActivityFactoryOptions) => {
  return new SetVariableReaction(meta, options)
}