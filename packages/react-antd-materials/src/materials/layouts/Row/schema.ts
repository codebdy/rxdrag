import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "GutterInput",
      "x-data": {
        name: "gutter",
        label: "$gutter",
      },
    },
  ]
}

export const rowSchema: INodeSchema = createSchema(options)