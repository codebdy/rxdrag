import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

export const formOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-field": {
        name: "colon",
        label: "$colon",
      },
      props: {
        defaultChecked: true,
      }
    },
    {
      componentName: "Select",
      "x-field": {
        name: "layout",
        label: "$layout",
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
    },
    {
      "x-field": {
        name: "disabled",
        label: "$disabled",
      },
      componentName: "Switch"
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "labelAlign",
        label: "$labelAlign",
      },
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
      componentName: "Switch",
      "x-field": {
        name: "labelWrap",
        label: "$labelWrap",
      },
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
      componentName: "Radio.Group",
      "x-field": {
        name: "size",
        label: "$size",
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

export const formSchema: INodeSchema = createSchema(formOptions)