import {
  AbstractActivity,
  Activity,
  Input
} from '@rxdrag/minions-runtime';
import { INodeDefine } from '@rxdrag/minions-schema';


@Activity(SumArray.NAME)
export class SumArray extends AbstractActivity {
  public static NAME = 'system.sumArray';

  constructor(meta: INodeDefine) {
    super(meta);
  }

  @Input()
  inputHandler(inputValue?: number[], runContext?: object): void {
    if (!inputValue) {
      console.warn("Not give input to SumArray")
      return;
    }
    let result = 0;
    for (const one of inputValue){
      result = result + one
    }

    this.next(result, runContext)
  }
}
