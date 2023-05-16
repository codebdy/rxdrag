import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions";
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema";
import { message } from "antd";

export enum MessageType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
  Loading = "loading",
}

export interface IInfoMessageConfig extends IConfigMeta {
  type?: MessageType,
  duration?: number,
}

export class InfoMessageReaction extends AbstractActivity<IInfoMessageConfig> {

  constructor(meta: IActivityDefine<IInfoMessageConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue?: string) => {
    let msg = inputValue
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

export const InfoMessage: ActivityFactory = (meta: IActivityDefine<IInfoMessageConfig>, options?: IActivityFactoryOptions) => {
  return new InfoMessageReaction(meta, options)
}