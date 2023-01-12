import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$bordered",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "bordered",
            valuePropName: "checked",
          },
        }
      ],
    },
    {
      componentName: "FormItem",
      props: {
        label: "$split",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "split",
            valuePropName: "checked",
          },
        }
      ],
    },
    {
      componentName: "FormItem",
      props: {
        label: "$size",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "size",
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$large",
                value: "large"
              },
              {
                label: "$middle",
                value: "middle"
              },
              {
                label: "$small",
                value: "small"
              },
            ],
            defaultValue: "middle",
          }
        }
      ]
    }
  ],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$header",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "header"
          }
        },
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$footer",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "footer"
          }
        },
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)