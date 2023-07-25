import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "label",
        label: "$label",
      },
    },
    {

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
      },
      "x-field": {
        name: "labelAlign",
        label: "$labelAlign",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "labelWrap",
        label: "$labelWrap",
      },
    },
    {
      componentName: "ColInput",
      "x-field": {
        name: "labelCol",
      },

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
  slotSchemas: [
    {
      name: "input",
      label: "$input",
    },
  ]
}

export const fieldSchema: INodeSchema = createSchema(options)