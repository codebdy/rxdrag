import { SingleInputActivity, Activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

export const ReadFieldValueActivityName = "fieldy.readFieldValue"

export interface IReadFieldValueConfig {
  fieldPath?: string,
}

@Activity(ReadFieldValueActivityName)
export class ReadFieldValueActivity extends SingleInputActivity<IReadFieldValueConfig, IFieldyLogicFlowContext> {
  constructor(meta: IActivityDefine<IReadFieldValueConfig>, context:IFieldyLogicFlowContext) {
    super(meta, context)
  }

  execute(): void {
    const path = this.meta.config?.fieldPath 
    if(path){
      const field = this.context?.form?.getField(path)
      if(field){
        this.next(field.value)
      }
    }
  }
}
