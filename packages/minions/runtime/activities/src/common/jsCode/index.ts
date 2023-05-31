import { InputHandler, Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"


export interface IJsCodeConfig {
  expression?: string
}

@Activity(JsCode.NAME)
export class JsCode extends AbstractActivity<IJsCodeConfig> {
  public static NAME = "system.jsCode"
  constructor(meta: IActivityDefine<IJsCodeConfig>, options?: unknown) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("JsCodeReaction inputs count error")
    }
  }

  @Input()
  inputHandler = (inputValue: string) => {
    const expression = this.meta.config?.expression?.trim()
    if (expression) {
      const outputs: { [name: string]: InputHandler } = {}
      for (const output of this.jointers.outputs) {
        outputs[output.name] = output.push
      }

      // eslint-disable-next-line no-new-func
      new Function("return " + expression)()?.({ inputValue, outputs })
    }
  }

}
