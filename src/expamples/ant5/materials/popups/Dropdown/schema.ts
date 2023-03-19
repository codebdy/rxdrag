import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$arrow",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "arrow",
            params: {
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$trigger",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "trigger",
            params: {
              withBind: true,
            }
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$click",
                value: "click"
              },
              {
                label: "$hover",
                value: "hover"
              },
              {
                label: "$contextMenu",
                value: "contextMenu"
              },
            ],
            defaultValue: "click",
          }
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)