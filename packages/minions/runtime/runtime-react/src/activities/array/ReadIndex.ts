import { INodeDefine } from "@rxdrag/minions-schema";
import { IController, IControllerContext } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";

//未实现
@Activity(ReadIndex.NAME)
export class ReadIndex extends ControllerActivity<IControllerConfig> {
  public static NAME = "system-react.readArrayIndex"

  controller: IController
  constructor(meta: INodeDefine<IControllerConfig>, context?: IControllerContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
    if (!meta.config?.param?.controllerId) {
      throw new Error("ReadVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  @Input()
  inputHandler = () => {
    // if (this.meta.config?.param?.variable) {
    //   this.next(this.controller.getVariable(this.meta.config?.param.variable))
    // }
  }
}
