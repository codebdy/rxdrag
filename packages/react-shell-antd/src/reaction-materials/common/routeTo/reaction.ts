import { AbstractReaction, IReactionFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IReactionMeta, ReactionFactory } from "@rxdrag/schema"


export interface IRouteToConfig extends IConfigMeta {
  url?: string,
  fromInput?: boolean,
}

export class RouteToReaction extends AbstractReaction<IRouteToConfig> {
  constructor(meta: IReactionMeta<IRouteToConfig>, options?: IReactionFactoryOptions) {
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

export const RouteTo: ReactionFactory = (meta: IReactionMeta<IRouteToConfig>, options?: IReactionFactoryOptions) => {
  return new RouteToReaction(meta, options)
}