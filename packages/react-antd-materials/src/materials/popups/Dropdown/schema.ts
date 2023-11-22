import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Switch",
      "x-data": {
        name: "arrow",
        label: "$arrow",
      },
    },
    {
      componentName: "Radio.Group",
      "x-data": {
        name: "trigger",
        label: "$trigger",
      },
      props: {
        optionType: "button",
        options: [
          {
            label: "$click",
            value: "click"
          },
          {
            label: "$hover",
            value: "hover"
          },
          {
            label: "$contextMenu",
            value: "contextMenu"
          },
        ],
        defaultValue: "click",
      }
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)