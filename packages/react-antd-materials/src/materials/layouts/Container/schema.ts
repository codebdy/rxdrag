import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

export const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "MenuSelect",
      "x-data": {
        name: "menuId",
        label: "$navigation",
      },
    },
  ]
}

export const schema: INodeSchema = createSchema(schemaOptions)