import { IActivityDefine } from "@rxdrag/minions-schema";
import { IActivityFactoryOptions } from "../../controllers";
import { IController } from "../../interfaces";
import { AbstractControllerActivity } from "../AbstractControllerActivity";
import { IVariableConfig } from "./SetVariableReaction";
import { activity } from "@rxdrag/minions-runtime";

export const ReadVariableActivityName = "system-react.readVariable"
@activity(ReadVariableActivityName)
export class ReadVariableActivity extends AbstractControllerActivity {
  controller: IController
  constructor(meta: IActivityDefine<IVariableConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
    if (!meta.config?.controllerId) {
      throw new Error("ReadVariable not set controller id")
    }
    const controller = options?.controllers?.[meta.config?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  execute = () => {
    if (this.meta.config?.variable) {
      this.next(this.controller.getVariable(this.meta.config.variable))
    }
  }
}
