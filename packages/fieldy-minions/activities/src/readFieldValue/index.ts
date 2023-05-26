import { SingleInputActivity, activity } from "@rxdrag/minions/runtime/runtime-core"
import { IActivityDefine } from "@rxdrag/minions/schema"
import { IFieldyContext } from "../context"

export const ReadFieldValueActivityName = "fieldy.readFieldValue"

export interface IReadFieldValueConfig {
  fieldPath?: string,
}

@activity(ReadFieldValueActivityName)
export class ReadFieldValueReaction extends SingleInputActivity<IReadFieldValueConfig, IFieldyContext> {
  constructor(meta: IActivityDefine<IReadFieldValueConfig>, context:IFieldyContext) {
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
