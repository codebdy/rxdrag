import { INodeDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { IVariableConfig } from "./SetVariable";
import { Activity } from "@rxdrag/minions-runtime";

@Activity(ListenVariable.NAME)
export class ListenVariable extends AbstractControllerActivity<IVariableConfig> {
  public static NAME = "system-react.listenVariable"

  controller: IController
  constructor(meta: INodeDefine<IVariableConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.outPorts || {}).length !== 1) {
      throw new Error("ListenVariable outputs count error")
    }

    if (!meta.config?.param?.controllerId) {
      throw new Error("ListenVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller

    if (meta.config?.param?.variable) {
      this.controller?.subscribeToVariableChange(meta.config?.param.variable, this.valueHandler)
    } else {
      console.error("Not set variable to ListenVariableReaction")
    }
  }

  valueHandler = (inputValue: unknown) => {
    if (this.meta.config?.param?.variable) {
      this.next(inputValue)
    }
  }
}
