import { Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { UnListener, IReactContext } from "@rxdrag/minions-runtime-react";

export interface IEventConfig extends IControllerConfig {
  name?: string,
}

@Activity(EventActivity.NAME)
export class EventActivity extends ControllerActivity<IEventConfig> {
  public static NAME = "system-react.event"
  declare config?: IEventConfig;
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