import { INodeSchema } from "core";
import { inputBaseSchemas } from "../schemas";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    ...inputBaseSchemas
  ]
}

export const selectSchema: INodeSchema = createSchema(options)