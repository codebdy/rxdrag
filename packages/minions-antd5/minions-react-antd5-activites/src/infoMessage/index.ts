import { SingleInputActivity, activity } from "@rxdrag/minions-runtime";
import { IActivityFactoryOptions } from "@rxdrag/minions-runtime-react";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { message } from "antd";

export const MessageActivityName = "system-react-antd5.message"
export enum MessageType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
  Loading = "loading",
}

export interface IInfoMessageConfig {
  type?: MessageType,
  duration?: number,
}

@activity(MessageActivityName)
export class InfoMessageReaction extends SingleInputActivity<IInfoMessageConfig> {

  constructor(meta: IActivityDefine<IInfoMessageConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

  }

  execute = (inputValue?: string) => {
    const msg = inputValue
    switch (this.meta.config?.type) {
      case MessageType.Success:
        message.success(msg, this.meta.config?.duration)
        break;
      case MessageType.Error:
        message.error(msg, this.meta.config?.duration)
        break;
      case MessageType.Info:
        message.info(msg, this.meta.config?.duration)
        break;
      case MessageType.Warning:
        message.warning(msg, this.meta.config?.duration)
        break;
      case MessageType.Loading:
        message.loading(msg, this.meta.config?.duration)
        break;
      default:
        message.info(msg, this.meta.config?.duration)
        break;
    }
  }
}
