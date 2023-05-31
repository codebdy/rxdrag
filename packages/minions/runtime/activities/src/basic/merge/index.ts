import { AbstractActivity, Activity, DynamicInput } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IMergeConfig {
  fromInput?: boolean,
  times?: number
}

@Activity(Merge.NAME)
export class Merge extends AbstractActivity<IMergeConfig> {
  public static NAME = "system.merge";
  private noPassInputs: string[] = []
  private values: any = {}

  constructor(meta: IActivityDefine<IMergeConfig>) {
    super(meta)
    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.name)
    }
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown) => {
    this.values[inputName] = inputValue
    this.noPassInputs.splice(this.noPassInputs.indexOf(inputName), 1)
    if (this.noPassInputs.length === 0) {
      this.next(this.values)
    }
  }
}
