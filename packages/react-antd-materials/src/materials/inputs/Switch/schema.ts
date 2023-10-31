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
  ],
  field: {
    fieldType: "normal",
  },
}

export const materialSchema: INodeSchema = createSchema(options)