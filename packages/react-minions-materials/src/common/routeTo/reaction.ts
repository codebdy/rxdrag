import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"


export interface IRouteToConfig extends IConfigMeta {
  url?: string,
  fromInput?: boolean,
}

export class RouteToReaction extends AbstractActivity<IRouteToConfig> {
  constructor(meta: IActivityDefine<IRouteToConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue?: any) => {
    let url = inputValue
    if (!this.meta.config?.fromInput) {
      url = this.meta.config?.url
    }

    if (url) {
      this.options?.navigate?.(url)
    }
  }
}

export const RouteTo: ActivityFactory = (meta: IActivityDefine<IRouteToConfig>, options?: IActivityFactoryOptions) => {
  return new RouteToReaction(meta, options)
}