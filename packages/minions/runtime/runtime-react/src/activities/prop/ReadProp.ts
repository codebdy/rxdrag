import { INodeDefine } from "@rxdrag/minions-schema";
import { IController } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";

@Activity(ReadProp.NAME)
export class ReadProp extends AbstractControllerActivity<IPropConfig> {
  public static NAME = "system-react.readProp"

  constructor(meta: INodeDefine<IPropConfig>, controller: IController) {
    super(meta, controller)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadProp inputs count error")
    }
    if (!meta.config?.param?.controllerId) {
      throw new Error("ReadProp not set controller id")
    }
  }

  @Input()
  inputHandler = () => {
    if (this.meta.config?.param?.prop) {
      this.next(this.controller.getProp(this.meta.config?.param.prop))
    }
  }
}
