import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const schema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}