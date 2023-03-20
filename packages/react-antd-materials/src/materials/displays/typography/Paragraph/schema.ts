import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions, withFormItem } from "@rxdrag/react-antd-shell";
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
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))