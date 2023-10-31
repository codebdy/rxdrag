import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Radio.Group",
      "x-data": {
        name: "themeMode",
        label: "$themeMode",
      },
      props: {
        optionType: "button",
        options: [
          {
            label: "$inherit",
            value: "inherit"
          },
          {
            label: "$dark",
            value: "dark"
          },
          {
            label: "$light",
            value: "light"
          },
        ],
        defaultValue: "inherit",
      }
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)