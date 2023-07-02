import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../base-schema";

export const formSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}