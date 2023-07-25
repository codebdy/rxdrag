import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$value",
      },
    },
    {
      componentName: "IconInput",
      "x-field": {
        name: "prefix",
        label: "$prefix",
      },
    }
  ]
}

export const staticSchema: INodeSchema = createSchema(options)