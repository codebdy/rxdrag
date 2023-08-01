import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "GutterInput",
      "x-field": {
        name: "gutter",
        label: "$gutter",
      },
    },
  ]
}

export const rowSchema: INodeSchema = createSchema(options)