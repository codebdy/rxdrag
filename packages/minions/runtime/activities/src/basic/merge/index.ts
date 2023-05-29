import { MultipleInputActivity, Activity, DynamicInput } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const MergeActivityName = "system.merge"

export interface IMergeConfig {
  fromInput?: boolean,
  times?: number
}

@Activity(MergeActivityName)
export class MergeActivity extends MultipleInputActivity<IMergeConfig> {
  private noPassInputs: string[] = []
  private values: any = {}

  constructor(meta: IActivityDefine<IMergeConfig>) {
    super(meta)
    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.name)
      const handler = this.createInputHandler(input.name)
      this.registerHandler(input.name, handler)
    }
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown) => {

  }

  createInputHandler = (name: string) => {
    return (inputValue?: any) => {
      this.values[name] = inputValue
      this.noPassInputs.splice(this.noPassInputs.indexOf(name), 1)
      if (this.noPassInputs.length === 0) {
        this.next(this.values)
      }
    }
  }
}
