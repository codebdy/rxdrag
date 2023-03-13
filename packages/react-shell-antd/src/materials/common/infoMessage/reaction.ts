import { message } from "antd";
import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

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

export class InfoMessageReaction extends AbstractReaction<IInfoMessageConfig> {

  constructor(meta: IReactionMeta<IInfoMessageConfig>, options?: IReactionFactoryOptions) {
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

export const InfoMessage: ReactionFactory = (meta: IReactionMeta<IInfoMessageConfig>, options?: IReactionFactoryOptions) => {
  return new InfoMessageReaction(meta, options)
}