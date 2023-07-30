import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

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
      componentName: "Input",
      "x-field": {
        name: "href",
        label: "$href",
      }
    },
    {
      componentName: "Input",
      "x-field": {
        name: "target",
        label: "$target",
      }
    },
    ...typographySchema,
  ],
  canBindField: true,
}

export const schema: INodeSchema = createSchema(options)