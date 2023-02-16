import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
        params: {
          withBind: true,
        }
      },
    }
  ]
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))