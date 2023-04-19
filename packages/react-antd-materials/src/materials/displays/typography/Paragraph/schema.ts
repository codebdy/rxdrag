import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "TextArea",
      "x-field": {
        name: "value",
        label: "$content",
        params: {
          withBind: true,
        }
      },
    },
    ...typographySchema,
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))