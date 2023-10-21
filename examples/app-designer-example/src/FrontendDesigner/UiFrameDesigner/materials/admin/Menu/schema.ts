import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";

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