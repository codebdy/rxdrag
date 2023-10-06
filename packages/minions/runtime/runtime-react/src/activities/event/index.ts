import { Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerContext, UnListener } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";

export interface IEventConfig extends IControllerConfig {
  name?: string
}

@Activity(EventActivity.NAME)
export class EventActivity extends ControllerActivity<IEventConfig> {
  public static NAME = "system-react.event"
  config?: IEventConfig;
  unsub?: UnListener

  constructor(meta: INodeDefine<IEventConfig>, context: IControllerContext) {
    super(meta, context)
    if (meta.config?.name) {
      this.unsub = this.controller.subscribeToEvent(meta.config?.name, this.handleEvent)
    }
  }

  handleEvent = (args: unknown[]) => {
    this.next(args)
  }
}