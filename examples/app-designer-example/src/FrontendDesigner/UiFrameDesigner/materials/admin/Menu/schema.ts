import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";

export const schemaOptions: SchemaOptions = {
  canBindField: false,
  propSchemas: [
    {
      componentName: "MenuSelect",
      "x-field": {
        name: "menuId",
        label: "$navigation",
      },
    },
  ]
}

export const schema: INodeSchema = createSchema(schemaOptions)