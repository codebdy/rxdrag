import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerConfig } from "../ControllerActivity";
import { AbstractActivity, Activity, ILoopScopeContext, Input } from "@rxdrag/minions-runtime";

//未实现
@Activity(ReadRow.NAME)
export class ReadRow extends AbstractActivity<unknown, ILoopScopeContext> {
  public static NAME = "system-react.readArrayRow"

  constructor(meta: INodeDefine<IControllerConfig>, context?: ILoopScopeContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadVariable inputs count error")
    }
  }

  @Input()
  inputHandler = () => {
    this.next(this.context?.loopScope?.row)
  }
}
