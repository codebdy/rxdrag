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

  canBindField: true,
}

export const materialSchema: INodeSchema = createSchema(options)