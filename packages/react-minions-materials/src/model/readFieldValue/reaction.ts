import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"

export interface IReadFieldValueConfig extends IConfigMeta {
  fieldPath?: string,
}

export class ReadFieldValueReaction extends AbstractActivity<IReadFieldValueConfig> {
  constructor(meta: IActivityDefine<IReadFieldValueConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)
    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue?: any) => {
    const path = this.meta.config?.fieldPath || this.options?.fieldPath
    if(path){
      const field = this.options?.form?.getField(path)
      if(field){
        this.outputValue(field.value)
      }
    }
  }

  outputValue = (value?:any)=>{
    this.getOutputByName("output")?.push(value)
  }
}

export const ReadFieldValue: ActivityFactory = (meta: IActivityDefine<IReadFieldValueConfig>, options?: IActivityFactoryOptions) => {
  return new ReadFieldValueReaction(meta, options)
}