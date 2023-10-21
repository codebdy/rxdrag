import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-data": {
        label: "$staticCount",
        name: "dataSource",
      }
    },
  ],

  field: {
    fieldType: "array",
    hasRules: true,
  },
}

export const materialSchema: INodeSchema = createSchema(options)