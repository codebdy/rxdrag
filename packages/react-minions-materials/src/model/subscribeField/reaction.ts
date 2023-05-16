import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"
import { IForm } from "@rxdrag/fieldy"

export interface ISubscribeFieldConfig extends IConfigMeta {
  fieldPath?: string,
}

export interface IShellReactionFactoryOptions extends IActivityFactoryOptions {
  form?: IForm,
  fieldPath?: string,
}

export class SubscribeFieldReaction extends AbstractActivity<ISubscribeFieldConfig> {
  constructor(meta: IActivityDefine<ISubscribeFieldConfig>, options?: IShellReactionFactoryOptions) {
    super(meta, options)
    const path = meta.config?.fieldPath || options?.fieldPath
    if (path) {
      const field = options?.form?.getField(path)
      if (field) {
        field.onValueChange(this.handleValueChange)
      }
    }
  }

  handleValueChange = (value?: any) => {
    this.outputValue(value)
  }

  outputValue = (value?: any) => {
    this.getOutputByName("output")?.push(value)
  }
}

export const SubscribeField: ActivityFactory = (meta: IActivityDefine<ISubscribeFieldConfig>, options?: IActivityFactoryOptions) => {
  return new SubscribeFieldReaction(meta, options)
}