import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "label",
        label: "$label",
      },
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "disabled",
        label: "$disabled",
      },
    },
  ],
  field: {
    hasField: true,
  },
}
export const radioSchema: INodeSchema = createSchema(options)