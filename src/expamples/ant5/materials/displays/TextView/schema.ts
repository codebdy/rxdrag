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
      componentName: "Select",
      "x-field": {
        name: "mode",
        label: "$mode",
        params: {
          withBind: true,
        }
      },
      props: {
        options: [
          {
            label: "Normal",
            value: "Normal"
          },
          {
            label: "H1",
            value: "h1"
          },
          {
            label: "H2",
            value: "h2"
          },
          {
            label: "H3",
            value: "h3"
          },
          {
            label: "H4",
            value: "h4"
          },
          {
            label: "p",
            value: "p"
          },
        ],
        defaultValue: "default",
      }
    }
  ],
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))