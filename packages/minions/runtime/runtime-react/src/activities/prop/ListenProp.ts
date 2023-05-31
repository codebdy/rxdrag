import { IActivityDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { Activity } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";

@Activity(ListenProp.NAME)
export class ListenProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.listenProp"

  controller: IController
  constructor(meta: IActivityDefine<IPropConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.outPorts || {}).length !== 1) {
      throw new Error("ListenProp outputs count error")
    }

    if (!meta.config?.param?.controllerId) {
      throw new Error("ListenProp not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller

    if (meta.config?.param?.prop) {
      this.controller?.subscribeToPropChange(meta.config?.param.prop, this.valueHandler)
    } else {
      console.error("Not set Prop to ListenPropReaction")
    }
  }

  valueHandler = (inputValue: unknown) => {
    if (this.meta.config?.param?.prop) {
      this.next(inputValue)
    }
  }
}
