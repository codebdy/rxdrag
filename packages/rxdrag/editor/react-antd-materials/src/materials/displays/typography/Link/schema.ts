import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  props: [
    {
      name: "value",
      label: "$content",
      setter: {
        componentName: "Input",
      }
    },
    {
      name: "href",
      label: "$href",
      setter:{
        componentName: "Input",
      }
    },
    {
      name: "target",
      label: "$target",
      setter:{
        componentName: "Input",
      }
    },
    ...typographySchema,
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(options)