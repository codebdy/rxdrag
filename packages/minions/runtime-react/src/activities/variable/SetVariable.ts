import { INodeDefine } from "@rxdrag/minions-schema";
import { IVariableContext } from "../../interfaces";
import { Activity, Input } from "@rxdrag/minions-runtime";
import { VirableActivity, IVariableConfig } from "../VirableActivity";


@Activity(SetVariable.NAME)
export class SetVariable extends VirableActivity {
  public static NAME = "system-react.setVariable"

  constructor(meta: INodeDefine<IVariableConfig>, context?: IVariableContext) {
    super(meta, context)
    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("SetVariable inputs count error")
    }

  }
  @Input()
  inputHandler = (inputValue: string, runContext?: object) => {
    if (this.meta.config?.variable) {
      this.variableController?.setVariable(this.meta.config.variable, inputValue)
    }
    this.next(inputValue, runContext);
  }
}
