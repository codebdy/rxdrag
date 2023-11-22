import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "title",
        label: "$title",
      },
      props: {
        allowClear: true,
      }
    },
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        options: [
          {
            label: "$left",
            value: "left"
          },
          {
            label: "$center",
            value: "center"
          },
          {
            label: "$right",
            value: "right"
          },
        ],
        defaultValue: "left",
      },
      "x-data": {
        name: "align",
        label: "$align",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "ellipsis",
        label: "$ellipsis",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "fixed",
        label: "$fixed",
      }
    },
    {
      componentName: "CheckboxGroup",
      props: {
        options: [
          {
            label: "xxl",
            value: "xxl"
          },
          {
            label: "xl",
            value: "xl"
          },
          {
            label: "lg",
            value: "lg"
          },
          {
            label: "md",
            value: "md"
          },
          {
            label: "sm",
            value: "sm"
          },
          {
            label: "xs",
            value: "xs"
          },
        ],
      },
      "x-data": {
        name: "responsive",
        label: "$responsiveBreakpoints",
      }
    },
    {
      componentName: "InputNumber",
      "x-data": {
        name: "width",
        label: "$width",
      }
    },
  ],
  field: {
    fieldType: "normal",
    hasDefaultValue: true,
    hasLabel: true,
  },
}

export const materialSchema: INodeSchema = createSchema(options)