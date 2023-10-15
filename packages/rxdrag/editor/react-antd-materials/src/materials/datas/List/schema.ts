import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-field": {
        name: "bordered",
        label: "$bordered",
      }
    },
    {
      componentName: "Radio.Group",
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
      },
      "x-field": {
        name: "size",
        label: "$size",
      }
    },
  ],
  slotSchemas: [
    {
      name: "header",
      label: "$header",
    },
    {
      name: "footer",
      label: "$footer",
    },
  ],
  field: {
    hasField: true,
  },
}

export const materialSchema: INodeSchema = createSchema(options)