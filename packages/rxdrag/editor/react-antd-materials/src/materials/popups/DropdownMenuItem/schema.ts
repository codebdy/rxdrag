import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas:[
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "disabled",
        label: "$disabled",
      },
    },
    {
      componentName: "IconInput",
      "x-field": {
        name: "icon",
        label: "$icon",
      },
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)