import { SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const RandomActivityName = "system.random"
export interface IRandomConfig {
  maxValue?: number,
  minValue?: number,
}

@activity(RandomActivityName)
export class Random extends SingleInputActivity<IRandomConfig> {
  constructor(meta: IActivityDefine<IRandomConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }
  }

  execute = () => {
    const min = this.meta.config?.minValue || 0
    const max = (this.meta.config?.maxValue || 1) + 1
    this.next(this.getRandomInteger(min, max))
  }
  private getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}