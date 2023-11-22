import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "value",
        label: "$content",
      }
    },
    {
      componentName: "Input",
      "x-data": {
        name: "href",
        label: "$href",
      }
    },
    {
      componentName: "Input",
      "x-data": {
        name: "target",
        label: "$target",
      }
    },
    ...typographySchema,
  ],
  field: {
    fieldType: "normal",
  },
}

export const schema: INodeSchema = createSchema(options)