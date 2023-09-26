import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";
import { INodeSchema } from "@rxdrag/schema";

const scehmaOptions: SchemaOptions = {
  canBindField: true,
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        label: "$title",
        name: "title",
      }
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon"
    }
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)