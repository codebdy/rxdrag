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
          componentName: "Switch",
          "x-field": {
            name: "colon",
            params:{
              valuePropName: "checked",
              withBind: true,
            }
          },
          props: {
            defaultChecked: true
          }
        },
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$label",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "label",
            params: {
              withBind: true,
            }
          },
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
            params: {
              withBind: true,
            }
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
            params:{
              valuePropName: "checked",
              withBind: true,
            }
          },
          componentName: "Switch"
        }
      ]
    },
    {
      "x-field": {
        name: "labelCol",
        params: {
          withBind: true,
        }
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
        params: {
          withBind: true,
        }
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
  ]
}

export const formItemSchema: INodeSchema = createSchema(options)