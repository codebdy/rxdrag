import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, createSlotsSchema, withFormItem } from "../../../shared";

const options: SchemaOptions = {
  propsSchemas: [],
  slotsSchemas: createSlotsSchema(
    {
      name: "title",
      label: "$title"
    },
    {
      name: "footer",
      label: "$footer"
    },
  ),
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))