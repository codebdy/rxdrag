import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, InputHandler, ActivityFactory } from "@rxdrag/schema"

export interface IJsCodeConfig extends IConfigMeta {
  expression?: string
}

export class JsCodeReaction extends AbstractActivity<IJsCodeConfig> {

  constructor(meta: IActivityDefine<IJsCodeConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("JsCodeReaction inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    const expression = this.meta.config?.expression?.trim()
    if (expression) {
      const outputs: { [name: string]: InputHandler } = {}
      for(const output of this.outputs){
        outputs[output.name] = output.push
      }
      
      // eslint-disable-next-line no-new-func
      new Function("return " + expression)()?.({ inputValue, outputs })
    }
  }

}

export const JsCode: ActivityFactory = (meta: IActivityDefine<IJsCodeConfig>, options?: IActivityFactoryOptions) => {
  return new JsCodeReaction(meta, options)
}