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
      name: "title"
    },
    {
      label: "$content",
      name: "content"
    },
  ]
}
export const materialSchema: INodeSchema = createSchema(options)