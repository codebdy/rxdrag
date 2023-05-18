import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const RouteToActivityName = "system-react.routeTo"

export interface IRouteToConfig {
  url?: string,
  fromInput?: boolean,
}

export interface IRouteToOptions {
  navigate?: (url: string) => void
}

@activity(RouteToActivityName)
export class RouteTo extends SingleInputActivity<IRouteToConfig, IRouteToOptions> {
  constructor(meta: IActivityDefine<IRouteToConfig>, options?: IRouteToOptions) {
    super(meta, options)
  }

  execute = (inputValue?: string) => {
    let url = inputValue
    if (!this.meta.config?.fromInput) {
      url = this.meta.config?.url
    }

    if (url) {
      this.options?.navigate?.(url)
    }
  }
}
