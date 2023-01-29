import { INodeSchema } from "core";
import { inputBaseSchemas } from "../schemas";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    ...inputBaseSchemas
  ]
}

export const selectSchema: INodeSchema = createSchema(options)