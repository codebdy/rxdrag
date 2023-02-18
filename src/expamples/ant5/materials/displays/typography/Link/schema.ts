import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
        params: {
          withBind: true,
        }
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "href",
        label: "$href",
        params: {
          withBind: true,
        }
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "target",
        label: "$target",
        params: {
          withBind: true,
        }
      },
    },
  ],
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))