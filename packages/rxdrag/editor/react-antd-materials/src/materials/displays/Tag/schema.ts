import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      name: "value",
      label: "$content",
      setter: {
        componentName: "Input",
      }
    },
    {
      name: "closable",
      label: "$closable",
      setter: {
        componentName: "Switch",
      }
    },
    {
      name: "color",
      label: "$color",
      setter: {
        componentName: "TagColorInput",
      }
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon"
    }
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(options)