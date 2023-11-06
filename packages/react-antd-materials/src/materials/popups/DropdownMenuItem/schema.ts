import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas:[
    {
      componentName: "Input",
      "x-data": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "disabled",
        label: "$disabled",
      },
    },
    {
      componentName: "IconInput",
      "x-data": {
        name: "icon",
        label: "$icon",
      },
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)