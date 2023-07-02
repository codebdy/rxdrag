import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions<IFieldMeta<IBindParams>, ILogicFlowControllerMeta> = {
  propsSchemas: [

  ],

  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))