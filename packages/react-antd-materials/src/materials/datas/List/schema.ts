import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
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
      "x-data": {
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
    fieldType: "array",
  },
}

export const materialSchema: INodeSchema = createSchema(options)