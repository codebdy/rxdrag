import { InputHandler, Activity, AbstractActivity, DynamicInput } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"


export interface IJsCodeConfig {
  expression?: string
}

@Activity(JsCode.NAME)
export class JsCode extends AbstractActivity<IJsCodeConfig> {
  public static NAME = "system.jsCode"
  private noPassInputs: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private inputs: any = {}

  constructor(meta: INodeDefine<IJsCodeConfig>, options?: unknown) {
    super(meta, options)

    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.name)
    }
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown) => {
    this.inputs[inputName] = inputValue
    this.noPassInputs.splice(this.noPassInputs.indexOf(inputName), 1)
    if (this.noPassInputs.length === 0) {
      this.outputHandler(this.inputs)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputHandler = (inputs: any) => {
    const expression = this.meta.config?.expression?.trim()
    if (expression) {
      const outputs: { [name: string]: InputHandler } = {}
      for (const output of this.jointers.outputs) {
        outputs[output.name] = output.push
      }

      // eslint-disable-next-line no-new-func
      new Function("return " + expression)()?.({ inputs, outputs })
    }
  }

}
