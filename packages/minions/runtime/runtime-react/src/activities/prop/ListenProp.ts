import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { Activity } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";

@Activity(ListenProp.NAME)
export class ListenProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.listenProp"

  constructor(meta: INodeDefine<IPropConfig>, context: IControllerContext) {
    super(meta, context)

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
