import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

type InputFlag = {
  value?: unknown,
  inputed?: boolean
}

@Activity(Equal.NAME)
export class Equal extends AbstractActivity {
  public static NAME = "system.equal"
  public static INPUT_NAME_INPUT1 = "input1"
  public static INPUT_NAME_INPUT2 = "input2"

  private input1?: InputFlag
  private input2?: InputFlag

  constructor(meta: INodeDefine) {
    super(meta)
  }

  @Input(Equal.INPUT_NAME_INPUT1)
  inputHandler(inputValue: unknown): void {
    this.input1 = {
      value: inputValue,
      inputed: true,
    }
    this.doCompaire()
  }

  @Input(Equal.INPUT_NAME_INPUT2)
  inputHandler2(inputValue: unknown, runContext?: object): void {
    this.input2 = {
      value: inputValue,
      inputed: true,
    }
    this.doCompaire(runContext)
  }

  private doCompaire = (runContext?: object) => {
    if (this.input1?.inputed && this.input2?.inputed) {
      const flowTo = this.input1.value === this.input2.value ? "true" : "false";
      this.next(this.input1.value, runContext, flowTo)
    }
  }
}
