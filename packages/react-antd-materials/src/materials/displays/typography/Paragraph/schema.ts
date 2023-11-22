import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "TextArea",
      "x-data": {
        name: "value",
        label: "$content",
      },
    },
    ...typographySchema,
  ],
  field: {
    fieldType: "normal",
  },
}

export const schema: INodeSchema = createSchema(options)