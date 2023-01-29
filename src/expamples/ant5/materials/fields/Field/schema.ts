import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
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
            }
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
  ],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$input",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "input"
          }
        }
      ]
    },
  ]
}

export const fieldSchema: INodeSchema = createSchema(options)