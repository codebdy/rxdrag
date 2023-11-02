import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        label: "$title",
        name: "title",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$disabled",
        name: "disabled",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$danger",
        name: "danger",
      }
    },

  ],
  slotSchemas: [
    {
      componentName: "TreeListPopupSelect",
      name: "popup",
      label: "$popupType"
    }
  ],
}

export const boxSchema: INodeSchema = createSchema(schemaOptions)