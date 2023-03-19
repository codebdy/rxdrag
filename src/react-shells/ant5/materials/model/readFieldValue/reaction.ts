import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

export interface IReadFieldValueConfig extends IConfigMeta {
  fieldPath?: string,
}

export class ReadFieldValueReaction extends AbstractReaction<IReadFieldValueConfig> {
  constructor(meta: IReactionMeta<IReadFieldValueConfig>, options?: IReactionFactoryOptions) {
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

export const ReadFieldValue: ReactionFactory = (meta: IReactionMeta<IReadFieldValueConfig>, options?: IReactionFactoryOptions) => {
  return new ReadFieldValueReaction(meta, options)
}