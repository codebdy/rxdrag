import { INodeDefine } from "@rxdrag/minions-schema";
import { ControllerActivity } from "../ControllerActivity";
import { Activity, Input } from "@rxdrag/minions-runtime";
import { IPropConfig } from "./SetProp";
import { IReactContext } from "@rxdrag/minions-runtime-react";

@Activity(ReadProp.NAME)
export class ReadProp extends ControllerActivity<IPropConfig> {
  public static NAME = "system-react.readProp"

  constructor(meta: INodeDefine<IPropConfig>, context: IReactContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadProp inputs count error")
    }
    if (!meta.config?.controllerId) {
      throw new Error("ReadProp not set controller id")
    }
  }

  @Input()
  inputHandler = (_: unknown, runContext?: object) => {
    if (this.meta.config?.prop) {
      this.next(this.controller.getProp(this.meta.config?.prop), runContext)
    }
  }
}
