import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
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
      label: "$title",
      name: "title",
    },
    {
      label: "$extra",
      name: "extra",
    },
    {
      name: "footer",
      label: "$footer",
    },
  ]
}
export const materialSchema: INodeSchema = createSchema(options)