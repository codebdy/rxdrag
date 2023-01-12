import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$colon",
      },
      children: [
        {
          "x-field": {
            name: "colon",
            valuePropName: "checked",
          },
          componentName: "Switch",
          props: {
            defaultChecked: true,
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$layout",
      },
      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "layout",
          },
          props: {
            options: [
              {
                label: "Horizontal",
                value: "horizontal"
              },
              {
                label: "Vertical",
                value: "vertical"
              },
              {
                label: "Inline",
                value: "inline"
              },
            ],
            defaultValue: "horizontal",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$disabled",
      },
      children: [
        {
          "x-field": {
            name: "disabled",
            valuePropName: "checked",
          },
          componentName: "Switch"
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$labelAlign",
      },
      children: [
        {
          "x-field": {
            name: "labelAlign",
          },
          componentName: "Radio.Group",
          props: {
            optionType: "button",
            options: [
              {
                label: "$right",
                value: "right"
              },
              {
                label: "$left",
                value: "left"
              },
            ],
            defaultValue: "right",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$labelWrap",
      },
      children: [
        {
          "x-field": {
            name: "labelWrap",
            valuePropName: "checked",
          },
          componentName: "Switch"
        }
      ]
    },
    {
      "x-field": {
        name: "labelCol",
      },
      componentName: "ColInput",
      props: {
        title: "$labelCol",
        subTitles: {
          span: "$span",
          flex: "flex",
          offset: "$offset",
          order: "$order",
          pull: "$pull",
          push: "$push",
        }
      }
    },
    {
      "x-field": {
        name: "wrapperCol",
      },
      componentName: "ColInput",
      props: {
        title: "$wrapperCol",
        subTitles: {
          span: "$span",
          flex: "flex",
          offset: "$offset",
          order: "$order",
          pull: "$pull",
          push: "$push",
        }
      }
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
  ]
}

export const formSchema: INodeSchema = createSchema(options)