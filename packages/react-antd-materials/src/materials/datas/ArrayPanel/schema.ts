import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { ControllerScopeType } from "@rxdrag/minions-runtime-react";

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
  },
  ctrlScopeType: ControllerScopeType.array
}

export const materialSchema: INodeSchema = createSchema(options)