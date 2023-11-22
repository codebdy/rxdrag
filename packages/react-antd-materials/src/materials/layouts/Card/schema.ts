import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  slotSchemas: [
    {
      name: "title",
      label: "$title",
    },
    {
      name: "extra",
      label: "$extra",
    },
    {
      name: "actions",
      label: "$actions",
    },
  ]
}

export const cardSchema: INodeSchema = createSchema(options)