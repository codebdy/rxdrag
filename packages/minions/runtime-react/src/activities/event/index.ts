import { Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IReactContext, UnListener } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";

export interface IEventConfig extends IControllerConfig {
  name?: string,
}

@Activity(EventActivity.NAME)
export class EventActivity extends ControllerActivity<IEventConfig> {
  public static NAME = "system-react.event"
  config?: IEventConfig;
  unsub?: UnListener

  constructor(meta: INodeDefine<IEventConfig>, context: IReactContext) {
    super(meta, context)
    if (meta.config?.name) {
      this.unsub = this.controller.subscribeToEvent(meta.config?.name, this.handleEvent)
    }
  }

  handleEvent = (args?: unknown[]) => {
    if (!args) {
      this.next(args, {})
      return
    }
    for (let i = 0; i < args?.length; i++) {
      const output = this.jointers?.getOutputs()?.[i]
      output?.push(args[i], {})
    }
  }
}