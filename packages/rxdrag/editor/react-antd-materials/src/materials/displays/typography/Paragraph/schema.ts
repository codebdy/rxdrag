import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "TextArea",
      "x-field": {
        name: "value",
        label: "$content",
      },
    },
    ...typographySchema,
  ],
  field: {
    hasField: true,
  },
}

export const schema: INodeSchema = createSchema(options)