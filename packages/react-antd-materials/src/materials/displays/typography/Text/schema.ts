import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
      },
    },
    ...typographySchema,
  ],
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))