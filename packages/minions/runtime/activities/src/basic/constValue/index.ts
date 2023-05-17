import { AbstractActivity, ActivityFactory } from "@rxdrag/minions"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IConstValueConfig {
  value?: any,
}

export class ConstValueActivity extends AbstractActivity<IConstValueConfig> {

  constructor(meta: IActivityDefine<IConstValueConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Fixed value inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler as any)
  }

  inputHandler = () => {
    this.getOutputByName("output")?.push(this.meta.config?.value)
  }
}

export const ConstValue: ActivityFactory<IConstValueConfig> = (meta: IActivityDefine<IConstValueConfig>) => {
  return new ConstValueActivity(meta)
}

export const ConstValueName = "const"