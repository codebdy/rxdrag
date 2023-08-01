import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../base-schema";

export const resetFormSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}