import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerConfig } from "../ControllerActivity";
import { AbstractActivity, Activity, ILogicScopeContext, Input } from "@rxdrag/minions-runtime";

//未实现
@Activity(ReadIndex.NAME)
export class ReadIndex extends AbstractActivity<unknown, ILogicScopeContext> {
  public static NAME = "system-react.readArrayIndex"

  constructor(meta: INodeDefine<IControllerConfig>, context?: ILogicScopeContext) {
    super(meta, context)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("ReadIndex inputs count error")
    }

  }

  @Input()
  inputHandler = (_: unknown, runContext?: object) => {
    this.next(this.context?.logicScope?.index, runContext)
  }
}
