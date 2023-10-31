import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
        name: "disabled",
        label: "$disabled",
      },
    },
  ]
}
export const materialSchema: INodeSchema = createSchema(options)