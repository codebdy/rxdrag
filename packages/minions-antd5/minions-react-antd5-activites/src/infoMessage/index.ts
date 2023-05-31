import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { message } from "antd";

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

@Activity(InfoMessage.NAME)
export class InfoMessage extends AbstractActivity<IInfoMessageConfig> {
  public static NAME = "system-react-antd5.message";
  constructor(meta: IActivityDefine<IInfoMessageConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

  }

  @Input()
  inputHandler = (inputValue?: string) => {
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
