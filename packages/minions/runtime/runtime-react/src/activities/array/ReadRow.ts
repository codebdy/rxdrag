import { INodeDefine } from "@rxdrag/minions-schema";
import { IController, IReactContext } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";

//未实现
@Activity(ReadRow.NAME)
export class ReadRow extends ControllerActivity<IControllerConfig> {
  public static NAME = "system-react.readArrayRow"

  controller: IController
  constructor(meta: INodeDefine<IControllerConfig>, context?: IReactContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
    if (!meta.config?.controllerId) {
      throw new Error("ReadVariable not set controller id")
    }
    const controller = context?.controllers?.[meta.config?.controllerId]
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
