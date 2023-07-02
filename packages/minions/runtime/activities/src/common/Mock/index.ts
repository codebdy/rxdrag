import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IMockDataConfig {
  isError?: boolean,
  data?: any,
  duration?: number,
}

@Activity(Mock.NAME)
export class Mock extends AbstractActivity<IMockDataConfig> {
  public static NAME = "system.mock"

  constructor(meta: IActivityDefine<IMockDataConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any) => {
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
