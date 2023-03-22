import { INodeSchema } from "@rxdrag/schema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/minions/interfaces/metas";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";

const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
  propsSchemas: [

  ],

  logicOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))