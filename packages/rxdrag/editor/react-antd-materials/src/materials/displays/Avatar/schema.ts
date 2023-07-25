import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "shape",
        label: "$shape",
      },
      props: {
        optionType: "button",
        options: [
          {
            label: "$circle",
            value: "circle"
          },
          {
            label: "$square",
            value: "square"
          },
        ],
        defaultValue: "circle",
      }
    },
    {
      componentName: "InputNumber",
      "x-field": {
        name: "size",
        label: "$size",
      },
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon",
    },
  ]
}

export const avatarSchema: INodeSchema = createSchema(options)