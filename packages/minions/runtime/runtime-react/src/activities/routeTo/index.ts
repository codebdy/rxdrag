import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IReactContext } from "../../interfaces";

export interface IRouteToConfig {
  url?: string,
  fromInput?: boolean,
}


@Activity(RouteTo.NAME)
export class RouteTo extends AbstractActivity<IRouteToConfig, IReactContext> {
  public static NAME = "system-react.routeTo";

  constructor(meta: INodeDefine<IRouteToConfig>, context?: IReactContext) {
    super(meta, context)
  }

  @Input()
  inputHandler = (inputValue?: string, runContext?: object) => {
    let url = inputValue
    if (!this.meta.config?.fromInput) {
      url = this.meta.config?.url
    }

    if (url) {
      this.context?.navigate?.(url)
    }
  }
}
