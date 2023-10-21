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
      },
    },
    ...typographySchema,
  ],
  field: {
    hasField: true,
  },
}

export const schema: INodeSchema = createSchema(options)