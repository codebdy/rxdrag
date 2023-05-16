import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"


export interface IMockDataConfig extends IConfigMeta {
  isError?: boolean,
  data?: any,
  duration?: number,
}

export class MockDataReaction extends AbstractActivity<IMockDataConfig> {
  constructor(meta: IActivityDefine<IMockDataConfig>, options?: IActivityFactoryOptions) {
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

export const MockData: ActivityFactory = (meta: IActivityDefine<IMockDataConfig>, options?: IActivityFactoryOptions) => {
  return new MockDataReaction(meta, options)
}