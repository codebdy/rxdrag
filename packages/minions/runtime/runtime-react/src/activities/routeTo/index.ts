import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IRouteToConfig {
  url?: string,
  fromInput?: boolean,
}

export interface IRouteToContext {
  navigate?: (url: string) => void
}

@Activity(RouteTo.NAME)
export class RouteTo extends AbstractActivity<IRouteToConfig, IRouteToContext> {
  public static NAME = "system-react.routeTo";

  constructor(meta: IActivityDefine<IRouteToConfig>, context?: IRouteToContext) {
    super(meta, context)
  }

  @Input()
  inputHandler = (inputValue?: string) => {
    let url = inputValue
    if (!this.meta.config?.fromInput) {
      url = this.meta.config?.url
    }

    if (url) {
      this.context?.navigate?.(url)
    }
  }
}
