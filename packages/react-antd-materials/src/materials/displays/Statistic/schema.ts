import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Input",
      "x-data": {
        name: "value",
        label: "$value",
      },
    },
    {
      componentName: "IconInput",
      "x-data": {
        name: "prefix",
        label: "$prefix",
      },
    }
  ]
}

export const staticSchema: INodeSchema = createSchema(options)