import { INodeDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";

@Activity(ReadProp.NAME)
export class ReadProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.readProp"
  
  controller: IController
  constructor(meta: INodeDefine<IPropConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadProp inputs count error")
    }
    if (!meta.config?.param?.controllerId) {
      throw new Error("ReadProp not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  @Input()
  inputHandler = () => {
    if (this.meta.config?.param?.prop) {
      this.next(this.controller.getProp(this.meta.config?.param.prop))
    }
  }
}
