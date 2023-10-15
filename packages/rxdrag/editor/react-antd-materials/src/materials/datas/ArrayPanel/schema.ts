import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-field": {
        label: "$staticCount",
        name: "dataSource",
      }
    },
  ],

  field: {
    hasField: true,
    hasRules: true,
  },
}

export const materialSchema: INodeSchema = createSchema(options)