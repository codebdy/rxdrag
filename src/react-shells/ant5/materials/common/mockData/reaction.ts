import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IMockDataConfig extends IConfigMeta {
  isError?: boolean,
  data?: any,
  duration?: number,
}

export class MockDataReaction extends AbstractReaction<IMockDataConfig> {
  constructor(meta: IReactionMeta<IMockDataConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue?: any) => {
    this.getLoadingInput()?.push(true)
    if (this.meta.config?.isError) {
      setTimeout(() => {
        this.getLoadingInput()?.push(false)
        this.getErrorInput()?.push(inputValue)
      }, this.meta.config.duration)
    } else {
      setTimeout(() => {
        this.getLoadingInput()?.push(false)
        this.getSuccessInput()?.push(inputValue)
      }, this.meta.config?.duration)
    }
  }

  private getSuccessInput = () => {
    return this.getInputByName("success")
  }

  private getErrorInput = () => {
    return this.getInputByName("error")
  }

  private getLoadingInput = () => {
    return this.getInputByName("loading")
  }
}

export const MockData: ReactionFactory = (meta: IReactionMeta<IMockDataConfig>, options?: IReactionFactoryOptions) => {
  return new MockDataReaction(meta, options)
}