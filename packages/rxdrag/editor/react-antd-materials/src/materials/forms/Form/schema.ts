import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { containerSchema, fieldDisplaySchema } from "../../common";

export const formOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
        name: "colon",
        label: "$colon",
      },
      props: {
        defaultChecked: true,
      }
    },
    {
      componentName: "Select",
      "x-data": {
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
    // {
    //   "x-data": {
    //     name: "disabled",
    //     label: "$disabled",
    //   },
    //   componentName: "Switch"
    // },
    {
      componentName: "Radio.Group",
      "x-data": {
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
      "x-data": {
        name: "labelWrap",
        label: "$labelWrap",
      },
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
    {
      componentName: "Radio.Group",
      "x-data": {
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
    },
    ...containerSchema,
    ...fieldDisplaySchema,
  ],
  field: {
    fieldType: "form",
  },
}

export const formSchema: INodeSchema = createSchema(formOptions)