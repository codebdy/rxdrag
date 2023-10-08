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
  public static INPUT_NAME_MAX_VALUE = "maxValue"
  public static INPUT_NAME_MIN_VALUE = "minValue"

  private minValue?: number;
  private maxValue?: number;

  constructor(meta: INodeDefine<IRandomConfig>) {
    super(meta)
  }

  @Input(Random.INPUT_NAME_STARTUP)
  inputHandler = (_: unknown, runContext?: object) => {
    const min = this.minValue || this.meta.config?.minValue || 0
    const max = this.maxValue || (this.meta.config?.maxValue || 1) + 1
    this.next(this.getRandomInteger(min, max), runContext)
  }

  @Input(Random.INPUT_NAME_MIN_VALUE)
  minHandler = (inputValue?: number) => {
    this.minValue = inputValue
  }

  @Input(Random.INPUT_NAME_MAX_VALUE)
  maxHandler = (inputValue?: number) => {
    this.maxValue = inputValue
  }

  private getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}