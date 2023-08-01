import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "../../..";

const options: SchemaOptions = {
  slotSchemas:  [
    {
      name: "actions",
      label: "$actions",
    },
    {
      name: "extra",
      label: "$extra",
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)