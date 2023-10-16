import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { fieldDisplaySchema } from "../../common";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-field": {
        name: "colon",
        label: "$colon",
      },
      props: {
        defaultChecked: true
      }
    },
    {
      componentName: "Input",
      "x-field": {
        name: "label",
        label: "$label",
      },
    },
    {
      "x-field": {
        name: "labelAlign",
        label: "$labelAlign",
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
    },
    {
      "x-field": {
        name: "labelWrap",
        label: "$labelWrap",
      },
      componentName: "Switch"
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
    ...fieldDisplaySchema,
  ],
  field: {
    hasField: true,
    hasRules: true,
  },
}

export const formItemSchema: INodeSchema = createSchema(options)