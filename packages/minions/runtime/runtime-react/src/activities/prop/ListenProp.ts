import { INodeDefine } from "@rxdrag/minions-schema";
import { IController } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { Activity } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";

@Activity(ListenProp.NAME)
export class ListenProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.listenProp"

  constructor(meta: INodeDefine<IPropConfig>, controller: IController) {
    super(meta, controller)

    if (meta.config?.param?.prop) {
      controller?.subscribeToPropChange(meta.config?.param.prop, this.valueHandler)
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
