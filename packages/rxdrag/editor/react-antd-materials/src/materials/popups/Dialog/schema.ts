import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  props: [],
  slots: [
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