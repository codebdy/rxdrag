import {
  AbstractActivity,
  Activity,
  DynamicInput,
} from '@rxdrag/minions-runtime';
import { INodeDefine } from '@rxdrag/minions-schema';

@Activity(CollectToArray.NAME)
export class CollectToArray extends AbstractActivity {
  public static NAME = 'system.collectToArray';
  public static PORT_FINISHED = "finished"
  private noPassInputs: string[] = [];
  private  values:unknown[] = []

  constructor(meta: INodeDefine) {
    super(meta);
    this.resetNoPassInputs();
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown, runContext?: object) => {
    this.values.push(inputValue);
    this.noPassInputs = this.noPassInputs.filter(name=>name !== inputName)
    if (this.noPassInputs.length === 0) {
      this.next(this.values, runContext);
      this.resetNoPassInputs();
    }
  };

  resetNoPassInputs(){
    for (const input of this.meta.inPorts || []) {
      this.noPassInputs.push(input.name);
    }
  }
}
