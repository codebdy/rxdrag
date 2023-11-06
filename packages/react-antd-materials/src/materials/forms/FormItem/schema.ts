import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { fieldDisplaySchema } from "../../common";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
        name: "colon",
        label: "$colon",
      },
      props: {
        defaultChecked: false
      }
    },
    {
      componentName: "Input",
      "x-data": {
        name: "label",
        label: "$label",
      },
      props: {
        allowClear: true,
      }
    },
    {
      "x-data": {
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
      "x-data": {
        name: "labelWrap",
        label: "$labelWrap",
      },
      componentName: "Switch"
    },
    {
      "x-data": {
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
      "x-data": {
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
    fieldType: "normal",
    hasRules: true,
    hasDefaultValue: true,
    hasLabel: true,
  },
}

export const formItemSchema: INodeSchema = createSchema(options)