import { AbstractActivity, SingleInputActivity, activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const ConditionActivityName = "system.condition"

export interface IConditionConfig {
  trueExpression?: string
}

@activity(ConditionActivityName)
export class Condition extends SingleInputActivity<IConditionConfig> {
  constructor(meta: IActivityDefine<IConditionConfig>) {
    super(meta)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }
  }

  execute(inputValue: any): void {
    let result = inputValue
    if (this.meta.config?.trueExpression) {
      // eslint-disable-next-line no-new-func
      const func = new Function('inputValue', "return " + this.meta.config?.trueExpression)
      result = func(inputValue)
    }

    const flowTo = result ? "true" : "false";
    this.next(inputValue, flowTo)
  }
}
