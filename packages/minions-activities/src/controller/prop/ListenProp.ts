import { INodeDefine } from "@rxdrag/minions-schema";
import { ControllerActivity } from "../ControllerActivity";
import { Activity } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";
import { IReactContext } from "@rxdrag/minions-runtime-react";

@Activity(ListenProp.NAME)
export class ListenProp extends ControllerActivity<IPropConfig> {
  public static NAME = "system-react.listenProp"

  constructor(meta: INodeDefine<IPropConfig>, context: IReactContext) {
    super(meta, context)

    if (meta.config?.prop) {
      this.controller?.subscribeToPropChange(meta.config?.prop, this.valueHandler)
    } else {
      console.error("Not set Prop to ListenPropReaction")
    }
  }

  valueHandler = (inputValue: unknown) => {
    if (this.meta.config?.prop) {
      this.next(inputValue, {})
    }
  }
}
