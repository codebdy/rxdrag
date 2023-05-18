import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const MockActivityName = "system.mock"

export interface IMockDataConfig {
  isError?: boolean,
  data?: any,
  duration?: number,
}

@activity(MockActivityName)
export class Mock extends SingleInputActivity<IMockDataConfig> {
  constructor(meta: IActivityDefine<IMockDataConfig>) {
    super(meta)
  }

  execute = (inputValue?: any) => {
    const portLoading = "loading"
    this.next(true, portLoading)
    if (this.meta.config?.isError) {
      setTimeout(() => {
        this.next(false, portLoading)
        this.next("Read data error", "error")
      }, this.meta.config.duration)
    } else {
      setTimeout(() => {
        this.next(false, portLoading)
        this.next(inputValue, "success")
      }, this.meta.config?.duration)
    }
  }
}
