import { InputHandler, SingleInputActivity, Activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const JsCodeActivityName = "system.jsCode"

export interface IJsCodeConfig {
  expression?: string
}

@Activity(JsCodeActivityName)
export class JsCode extends SingleInputActivity<IJsCodeConfig> {

  constructor(meta: IActivityDefine<IJsCodeConfig>, options?: unknown) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("JsCodeReaction inputs count error")
    }
  }

  execute = (inputValue: string) => {
    const expression = this.meta.config?.expression?.trim()
    if (expression) {
      const outputs: { [name: string]: InputHandler } = {}
      for(const output of this.jointers.outputs){
        outputs[output.name] = output.push
      }
      
      // eslint-disable-next-line no-new-func
      new Function("return " + expression)()?.({ inputValue, outputs })
    }
  }

}
