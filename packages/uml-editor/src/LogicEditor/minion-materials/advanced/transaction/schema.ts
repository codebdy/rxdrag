import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const transactionSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}