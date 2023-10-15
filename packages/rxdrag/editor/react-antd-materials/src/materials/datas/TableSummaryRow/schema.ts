import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-field": {
        name: "bordered",
        label: "$bordered",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "split",
        label: "$split",
      },
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
        defaultValue: "middle",
      }
    }
  ],
  slotSchemas: [
    {
      label: "$header",
      name: "header"
    },
    {
      label: "$footer",
      name: "footer"
    },
  ],
}

export const materialSchema: INodeSchema = createSchema(options)