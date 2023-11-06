import { INodeDefine } from "@rxdrag/minions-schema";
import { IVariableContext } from "../../interfaces";
import { Activity, Input } from "@rxdrag/minions-runtime";
import { IVariableConfig, VirableActivity } from "../VirableActivity";

@Activity(ReadVariable.NAME)
export class ReadVariable extends VirableActivity {
  public static NAME = "system-react.readVariable"

  constructor(meta: INodeDefine<IVariableConfig>, context?: IVariableContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
  }

  @Input()
  inputHandler = (_: unknown, runContext?: object) => {
    if (this.meta.config?.variable) {
      this.next(this.variableController.getVariable(this.meta.config.variable), runContext)
    }
  }
}
