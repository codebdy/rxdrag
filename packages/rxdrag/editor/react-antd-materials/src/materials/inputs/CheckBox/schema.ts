import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "label",
        label: "$label",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "disabled",
        label: "$disabled",
      },
    },
  ]
}
export const selectSchema: INodeSchema = createSchema(options)