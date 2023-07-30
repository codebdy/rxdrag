import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../base-schema";

export const resetFieldSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}