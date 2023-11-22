import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [

  ],

  field: {
    fieldType: "array",
  },
}

export const materialSchema: INodeSchema = createSchema(options)