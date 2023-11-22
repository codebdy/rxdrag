import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Select",
      "x-data": {
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
      "x-data": {
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
        defaultValue: "small",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "wrap",
        label: "$wrap",
      },
    },
  ],
}

export const schema: INodeSchema = createSchema(options)