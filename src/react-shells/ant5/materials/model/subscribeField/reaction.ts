import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface ISubscribeFieldConfig extends IConfigMeta {
  fieldPath?: string,
}

export class SubscribeFieldReaction extends AbstractReaction<ISubscribeFieldConfig> {
  constructor(meta: IReactionMeta<ISubscribeFieldConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)
    const path = meta.config?.fieldPath || options?.fieldPath
    if(path){
      const field = options?.form?.getField(path)
      if(field){
        field.onValueChange(this.handleValueChange)
        this.outputValue(field.value)
      }
    }
  }

  handleValueChange = (value?: any) => {
    this.outputValue(value)
  }

  outputValue = (value?:any)=>{
    this.getOutputByName("output")?.push(value)
  }
}

export const SubscribeField: ReactionFactory = (meta: IReactionMeta<ISubscribeFieldConfig>, options?: IReactionFactoryOptions) => {
  return new SubscribeFieldReaction(meta, options)
}