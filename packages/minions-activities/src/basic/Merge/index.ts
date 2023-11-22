import {
  AbstractActivity,
  Activity,
  DynamicInput
} from '@rxdrag/minions-runtime';
import { INodeDefine } from '@rxdrag/minions-schema';


@Activity(Merge.NAME)
export class Merge extends AbstractActivity<unknown> {
  public static NAME = 'system.merge';
  private noPassInputs: string[] = [];
  private values: { [key: string]: unknown } = {};

  constructor(meta: INodeDefine<unknown>) {
    super(meta);
    this.resetNoPassInputs();
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown, runContext?: object) => {
    this.values[inputName] = inputValue;
    this.noPassInputs = this.noPassInputs.filter(name => name !== inputName)
    if (this.noPassInputs.length === 0) {
      this.next(this.values, runContext);
      this.resetNoPassInputs();
    }
  };

  resetNoPassInputs() {
    for (const input of this.meta.inPorts || []) {
      this.noPassInputs.push(input.name);
    }
  }
}
