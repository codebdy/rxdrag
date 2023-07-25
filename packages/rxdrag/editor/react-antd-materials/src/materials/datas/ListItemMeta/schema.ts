import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  slotSchemas: [
    {
      name: "avatar",
      label: "$avatar",
    },
    {
      name: "title",
      label: "$title",
    },
    {
      name: "description",
      label: "$description",
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)