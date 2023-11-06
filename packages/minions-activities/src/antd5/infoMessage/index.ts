import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IReactAntdContext } from "../contexts";

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
export class InfoMessage extends AbstractActivity<IInfoMessageConfig, IReactAntdContext> {
  public static NAME = "system-react-antd5.message";
  constructor(meta: INodeDefine<IInfoMessageConfig>, context?: IReactAntdContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

  }

  @Input()
  inputHandler = (inputValue?: string | Error) => {
    const msg = inputValue
    const { messageApi } = this.context || {}
    switch (this.meta.config?.type) {
      case MessageType.Success:
        messageApi?.success(msg as string, this.meta.config?.duration)
        break;
      case MessageType.Error:
        inputValue && messageApi?.error((inputValue as Error)?.message, this.meta.config?.duration)
        break;
      case MessageType.Info:
        messageApi?.info(msg as string, this.meta.config?.duration)
        break;
      case MessageType.Warning:
        messageApi?.warning(msg as string, this.meta.config?.duration)
        break;
      case MessageType.Loading:
        messageApi?.loading(msg as string, this.meta.config?.duration)
        break;
      default:
        messageApi?.info(msg as string, this.meta.config?.duration)
        break;
    }
  }
}
