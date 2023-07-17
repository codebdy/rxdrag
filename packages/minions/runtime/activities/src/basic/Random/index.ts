import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IRandomConfig {
  maxValue?: number,
  minValue?: number,
}

@Activity(Random.NAME)
export class Random extends AbstractActivity<IRandomConfig> {
  public static NAME = "system.random"
  public static INPUT_NAME_STARTUP = "startUp"

  constructor(meta: INodeDefine<IRandomConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }
  }

  @Input(Random.INPUT_NAME_STARTUP)
  inputHandler = () => {
    const min = this.meta.config?.minValue || 0
    const max = (this.meta.config?.maxValue || 1) + 1
    this.next(this.getRandomInteger(min, max))
  }
  private getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}