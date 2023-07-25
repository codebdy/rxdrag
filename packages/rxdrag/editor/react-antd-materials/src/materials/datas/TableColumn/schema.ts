import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
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
      "x-field": {
        name: "align",
        label: "$align",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "ellipsis",
        label: "$ellipsis",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
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
      "x-field": {
        name: "responsive",
        label: "$responsiveBreakpoints",
      }
    },
    {
      componentName: "InputNumber",
      "x-field": {
        name: "width",
        label: "$width",
      }
    },
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(options)