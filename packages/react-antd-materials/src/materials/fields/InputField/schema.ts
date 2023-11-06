import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "label",
        label: "$label",
      },
    },
  ],
  slotSchemas: [
    {
      name: "input",
      label: "$input",
    },
  ]
}

export const fieldSchema: INodeSchema = createSchema(options)