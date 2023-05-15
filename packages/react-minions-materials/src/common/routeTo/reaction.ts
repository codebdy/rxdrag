import { AbstractReaction, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IReactionMeta, ActivityFactory } from "@rxdrag/schema"


export interface IRouteToConfig extends IConfigMeta {
  url?: string,
  fromInput?: boolean,
}

export class RouteToReaction extends AbstractReaction<IRouteToConfig> {
  constructor(meta: IReactionMeta<IRouteToConfig>, options?: IActivityFactoryOptions) {
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

export const RouteTo: ActivityFactory = (meta: IReactionMeta<IRouteToConfig>, options?: IActivityFactoryOptions) => {
  return new RouteToReaction(meta, options)
}