import { INodeSchema } from "@rxdrag/schema";
import { createSchema } from "../../../shared";
import { formOptions } from "../Form/schema";


export const formLayoutSchema: INodeSchema = createSchema({
  ...formOptions,
  field: {
    fieldType: "object",
  },
})