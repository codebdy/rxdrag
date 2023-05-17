import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"

export interface IMergeConfig extends IConfigMeta {
  fromInput?: boolean,
  times?: number
}

export class MergeReaction extends AbstractActivity<IMergeConfig> {
  private noPassInputs: string[] = []
  private values: any = {}

  constructor(meta: IActivityDefine<IMergeConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)
    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.id)
      this.getInputById(input.id)?.connect(this.createInputHandler(input.id))
    }
  }

  createInputHandler = (id: string) => {
    return (inputValue?: any) => {
      this.values[id] = inputValue
      this.noPassInputs.splice(this.noPassInputs.indexOf(id), 1)
      if (this.noPassInputs.length === 0) {
        this.output(this.values)
      }
    }
  }

  output = (value: any) => {
    this.getOutputByName("output")?.push(value)
  }
}

export const Merge: ActivityFactory = (meta: IActivityDefine<IMergeConfig>, options?: IActivityFactoryOptions) => {
  return new MergeReaction(meta, options)
}