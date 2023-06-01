import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

export interface IFieldValueConfig {
  fieldPath?: string,
}

@Activity(ReadFieldValue.NAME)
export class ReadFieldValue extends AbstractActivity<IFieldValueConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.readFieldValue"

  constructor(meta: IActivityDefine<IFieldValueConfig>, context:IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    const path = this.meta.config?.fieldPath 
    if(path){
      const field = this.context?.form?.getField(path)
      if(field){
        this.next(field.value)
      }
    }
  }
}
