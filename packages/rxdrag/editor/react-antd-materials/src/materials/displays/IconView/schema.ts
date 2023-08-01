import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-field": {
        name: "size",
        label: "$size",
      },
    },
    {
      componentName: "ColorInput",
      "x-field": {
        name: "color",
        label: "$color",
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

export const iconViewSchema: INodeSchema = createSchema(options)