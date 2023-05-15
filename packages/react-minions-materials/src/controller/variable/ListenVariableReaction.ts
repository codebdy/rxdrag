import { IController, IActivityFactoryOptions } from "@rxdrag/minions";
import { IActivityDefine, ActivityFactory } from "@rxdrag/schema";
import { AbstractControllerReaction } from "../AbstractControllerReaction";
import { IVariableConfig } from "./SetVariableReaction";

export class ListenVariableReaction extends AbstractControllerReaction {
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.outPorts || {}).length !== 1) {
      throw new Error("ListenVariable outputs count error")
    }

    if(!meta.config?.controllerId){
      throw new Error("ListenVariable not set controller id")
    }
    const controller = options?.controllers?.[meta.config?.controllerId]
    if(!controller){
      throw new Error("Can not find controller")
    }
    this.controller = controller

    if(meta.config?.variable){
      this.controller?.subscribeToVariableChange(meta.config?.variable, this.outputHandler)
    }else{
      console.error("Not set variable to ListenVariableReaction")
    }
  }

  outputHandler = (inputValue: string) => {
    if (this.meta.config?.variable) {
      this.getOutputByName("output")?.push(inputValue)
    }
  }
}

export const ListenVariable: ActivityFactory = (meta: IActivityDefine<IVariableConfig>, options?: IActivityFactoryOptions) => {
  return new ListenVariableReaction(meta, options)
}