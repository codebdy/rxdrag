import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$themeMode",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "themeMode",
            params: {
              withBind: true,
            }
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$inherit",
                value: "inherit"
              },
              {
                label: "$dark",
                value: "dark"
              },
              {
                label: "$light",
                value: "light"
              },
            ],
            defaultValue: "inherit",
          }
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)