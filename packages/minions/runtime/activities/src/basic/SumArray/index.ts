import {
  AbstractActivity,
  Activity,
  Input
} from '@rxdrag/minions-runtime';
import { IActivityDefine } from '@rxdrag/minions-schema';


@Activity(SumArray.NAME)
export class SumArray extends AbstractActivity {
  public static NAME = 'system.sumArray';

  constructor(meta: IActivityDefine) {
    super(meta);
  }

  @Input()
  inputHandler(inputValue?: number[]): void {
    if (!inputValue) {
      console.warn("Not give input to SumArray")
      return;
    }
    let result = 0;
    for (const one of inputValue){
      result = result + one
    }

    this.next(result)
  }
}
