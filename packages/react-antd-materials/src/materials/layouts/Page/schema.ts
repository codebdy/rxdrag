import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { containerSchema } from "../../common";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    ...containerSchema,
  ]
}

export const schema: INodeSchema = createSchema(schemaOptions)