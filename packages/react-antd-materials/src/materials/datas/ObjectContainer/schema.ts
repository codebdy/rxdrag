import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  field: {
    fieldType: "object",
  },
}

export const boxSchema: INodeSchema = createSchema(options)