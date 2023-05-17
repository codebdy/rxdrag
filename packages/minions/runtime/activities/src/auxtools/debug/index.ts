
export interface IDebugConfig {
  tip?:string,
  closed?: boolean
}

export class DebugActivity extends SingleInputActivity<IDebugConfig> {

  constructor(config: IDebugConfig) {
    super(config)


    this.getInputByName("input")?.connect(this.inputHandler as any)
  }

  inputHandler = (inputValue: string) => {
    if (!this.config?.closed) {
      console.log(`🪲${this.config.label || "Debug"}:`, inputValue)
    }
  }
}

//Jointer的构建不在这里，在统一的FlowLogic类
export const Debug: ActivityFactory<IDebugConfig> = (meta: IActivityDefine<IDebugConfig>) => {
  return new DebugActivity(meta)
}

export const DebugActivityName = "debug"