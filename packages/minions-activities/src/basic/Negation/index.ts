import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

@Activity(Negation.NAME)
export class Negation extends AbstractActivity {
  public static NAME = "system.negation"

  constructor(meta: INodeDefine) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: boolean, runContext?: object) => {
    this.next(!inputValue, runContext)
  }
}
