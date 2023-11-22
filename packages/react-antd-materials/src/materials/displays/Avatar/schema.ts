import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Radio.Group",
      "x-data": {
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
      "x-data": {
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