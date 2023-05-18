import { AbstractActivity, ActivityFactory } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IConditionConfig {
  trueExpression?: string
}

export class ConditionActivity extends AbstractActivity<IConditionConfig> {
  constructor(meta: IActivityDefine<IConditionConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler as any)
  }

  inputHandler = (inputValue: string) => {
    let result = inputValue
    if (this.meta.config?.trueExpression) {
      // eslint-disable-next-line no-new-func
      const func = new Function('inputValue', "return " + this.meta.config?.trueExpression)
      result = func(inputValue)
    }
    if (result) {
      this.getOutputByName('true')?.push(inputValue)
    } else {
      this.getOutputByName('false')?.push(inputValue)
    }
  }
}

export const Condition: ActivityFactory<IConditionConfig> = (meta: IActivityDefine<IConditionConfig>) => {
  return new ConditionActivity(meta)
}

export const ConditionActivityName = "condition"