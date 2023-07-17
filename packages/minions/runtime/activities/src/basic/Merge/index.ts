import {
  AbstractActivity,
  Activity,
  DynamicInput
} from '@rxdrag/minions-runtime';
import { INodeDefine } from '@rxdrag/minions-schema';

export interface IMergeConfig {
  fromInput?: boolean;
  times?: number;
}

@Activity(Merge.NAME)
export class Merge extends AbstractActivity<IMergeConfig> {
  public static NAME = 'system.merge';
  private noPassInputs: string[] = [];
  private inputCount = 0;
  private values: any = {};

  constructor(meta: INodeDefine<IMergeConfig>) {
    super(meta);
    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.name);
    }
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown) => {
    this.values[inputName] = inputValue;
    this.inputCount++;
    if (this.noPassInputs.length === this.inputCount) {
      this.next(this.values);
      console.log('===this.values', this.values);
      this.inputCount = 0;
    }
  };
}
