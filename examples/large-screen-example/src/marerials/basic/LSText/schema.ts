import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../shared";

const scehmaOptions: SchemaOptions = {
  noStyle: true,
  propSchemas: [
    {
      componentName: "TextArea",
      "x-field": {
        name: "value",
        label: "$content",
      },
    }
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)