import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";

const options: SchemaOptions = {
  props: [
    {
      componentName: "Select",
      "x-field": {
        name: "align",
        label: "$align",
      },
      props: {
        options: [
          {
            label: "Start",
            value: "start"
          },
          {
            label: "End",
            value: "end"
          },
          {
            label: "Center",
            value: "center"
          },
          {
            label: "Baseline",
            value: "baseline"
          },
        ],
      }
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "direction",
        label: "$direction",
      },
      props: {
        optionType: "button",
        options: [
          {
            label: "$horizontal",
            value: "Horizontal"
          },
          {
            label: "$vertical",
            value: "vertical"
          },
        ],
        defaultValue: "Horizontal",
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
        defaultValue: "small",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "wrap",
        label: "$wrap",
        params: {
          valuePropName: "checked",
        }
      },
    },
  ],
}

export const schema: INodeSchema = createSchema(withFormItem(options))