import { IBindParams } from "@rxdrag/react-runner";
import { IControllerMeta, IFieldMeta, INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";

const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
  propsSchemas: [

  ],

  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))