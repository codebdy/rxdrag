import { InputHandler, Activity, AbstractActivity, DynamicInput, IExpContext } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"


export interface IJsCodeConfig {
  noWaiting?: boolean,
  expression?: string
}

@Activity(JsCode.NAME)
export class JsCode extends AbstractActivity<IJsCodeConfig, IExpContext> {
  public static NAME = "system.jsCode"
  private noPassInputs: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private inputs: any = {}

  constructor(meta: INodeDefine<IJsCodeConfig>, context?: IExpContext) {
    super(meta, context)

    for (const input of meta.inPorts || []) {
      this.noPassInputs.push(input.name)
    }
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown, context?: unknown) => {
    this.inputs[inputName] = inputValue
    this.noPassInputs.splice(this.noPassInputs.indexOf(inputName), 1)
    if (this.noPassInputs.length === 0 || this.config?.noWaiting) {
      this.outputHandler(this.inputs, context)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputHandler = (inputs: any, context?: unknown) => {
    const expression = this.meta.config?.expression?.trim()
    if (expression) {
      const outputs: { [name: string]: InputHandler } = {}
      for (const output of this.jointers.getOutputs()) {
        outputs[output.name] = output.push
      }

      const fn = new Function(...Object.keys(this.context?.expVariables || {}), "return " + expression)
      fn?.(...Object.values(this.context?.expVariables || {}))?.({ context, inputs, outputs })
    }
  }

}
