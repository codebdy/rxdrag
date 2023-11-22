import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-data": {
        name: "size",
        label: "$size",
      },
    },
    {
      componentName: "ColorInput",
      "x-data": {
        name: "color",
        label: "$color",
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

export const iconViewSchema: INodeSchema = createSchema(options)