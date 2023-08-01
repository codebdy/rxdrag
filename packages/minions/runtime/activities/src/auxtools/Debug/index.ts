import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

//调试节点配置
export interface IDebugConfig {
  //提示信息
  tip?: string,
  //是否已关闭
  closed?: boolean
}

@Activity(DebugActivity.NAME)
export class DebugActivity extends AbstractActivity<IDebugConfig> {
  //对应INodeDefine 跟IActivityMaterial的 activityName
  public static NAME = "system.debug"

  constructor(meta: INodeDefine<IDebugConfig>) {
    super(meta)
  }

  //入口处理函数
  @Input()
  inputHandler(inputValue: unknown): void {
    if (!this.config?.closed) {
      console.log(`🪲${this.config?.tip || "Debug"}:`, inputValue)
    }
  }
}

