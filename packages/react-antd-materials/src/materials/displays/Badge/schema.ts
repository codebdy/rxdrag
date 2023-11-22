import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "InputNumber",
      "x-data": {
        name: "count",
        label: "$count",
      },
    },
    {
      componentName: "Radio.Group",
      "x-data": {
        name: "placement",
        label: "$placement",
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
          {
            label: "$top",
            value: "top"
          },
          {
            label: "$bottom",
            value: "bottom"
          },
        ],
        defaultValue: "right",
      }
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon",
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)