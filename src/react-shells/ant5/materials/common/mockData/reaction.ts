import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

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

    this.getLoadingOutput()?.push(true)
    if (this.meta.config?.isError) {
      setTimeout(() => {
        this.getLoadingOutput()?.push(false)
        this.getErrorOutput()?.push("Read data error")
      }, this.meta.config.duration)
    } else {
      setTimeout(() => {
        this.getLoadingOutput()?.push(false)
        this.getSuccessOutput()?.push(inputValue)
      }, this.meta.config?.duration)
    }
  }

  private getSuccessOutput = () => {
    return this.getOutputByName("success")
  }

  private getErrorOutput = () => {
    return this.getOutputByName("error")
  }

  private getLoadingOutput = () => {
    return this.getOutputByName("loading")
  }
}

export const MockData: ReactionFactory = (meta: IReactionMeta<IMockDataConfig>, options?: IReactionFactoryOptions) => {
  return new MockDataReaction(meta, options)
}