import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "closable",
        label: "$closable",
      }
    },
    {
      componentName: "TagColorInput",
      "x-field": {
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
  canBindField: true,
}

export const schema: INodeSchema = createSchema(options)