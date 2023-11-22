import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-data": {
        name: "span",
        label: "$span",
      },
    },
  ]
}

export const rowSchema: INodeSchema = createSchema(options)