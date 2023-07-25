import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [],
  slotSchemas: [
    {
      name: "title",
      label: "$title"
    },
    {
      name: "footer",
      label: "$footer"
    },
  ],
}

export const materialSchema: INodeSchema = createSchema(options)