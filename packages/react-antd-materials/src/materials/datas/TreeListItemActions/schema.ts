import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
        label: "$fixed",
        name: "fixed",
      }
    },
  ],
  field: {
    fieldType: "object",
  }
}

export const schema: INodeSchema = createSchema(schemaOptions)