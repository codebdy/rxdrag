import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas:  [
    {
      componentName: "ImageInput",
      "x-data": {
        name: "value",
        label: "$value",
      },
    },
    {
      componentName: "SizeInput",
      "x-data": {
        name: "height",
        label: "$height",
      },
      props:{
        exclude:["inherit", "auto"]
      }
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)