import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const RouteToActivityName = "system-react.routeTo"

export interface IRouteToConfig {
  url?: string,
  fromInput?: boolean,
}

export interface IRouteToContext {
  navigate?: (url: string) => void
}

@activity(RouteToActivityName)
export class RouteTo extends SingleInputActivity<IRouteToConfig, IRouteToContext> {
  constructor(meta: IActivityDefine<IRouteToConfig>, context?: IRouteToContext) {
    super(meta, context)
  }

  execute = (inputValue?: string) => {
    let url = inputValue
    if (!this.meta.config?.fromInput) {
      url = this.meta.config?.url
    }

    if (url) {
      this.context?.navigate?.(url)
    }
  }
}
