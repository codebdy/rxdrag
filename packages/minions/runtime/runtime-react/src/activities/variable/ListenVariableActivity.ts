import { IActivityDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { IVariableConfig } from "./SetVariableReaction";
import { activity } from "@rxdrag/minions-runtime";

export const ListenVariableActivityName = "system-react.listenVariable"
@activity(ListenVariableActivityName)
export class ListenVariableActivity extends AbstractControllerActivity<IVariableConfig> {
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.outPorts || {}).length !== 1) {
      throw new Error("ListenVariable outputs count error")
    }

    if (!meta.config?.controllerId) {
      throw new Error("ListenVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller

    if (meta.config?.variable) {
      this.controller?.subscribeToVariableChange(meta.config?.variable, this.execute)
    } else {
      console.error("Not set variable to ListenVariableReaction")
    }
  }

  execute = (inputValue: unknown) => {
    if (this.meta.config?.variable) {
      this.next(inputValue)
    }
  }
}
