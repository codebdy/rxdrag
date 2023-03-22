import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const options: SchemaOptions = {
  propsSchemas: [
    ...inputBaseSchemas
  ]
}

export const selectSchema: INodeSchema = createSchema(options)