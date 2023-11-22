import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "value",
        label: "$content",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "closable",
        label: "$closable",
      }
    },
    {
      componentName: "TagColorInput",
      "x-data": {
        name: "color",
        label: "$color",
      }
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon"
    }
  ],
  field: {
    fieldType: "normal",
  },
}

export const schema: INodeSchema = createSchema(options)