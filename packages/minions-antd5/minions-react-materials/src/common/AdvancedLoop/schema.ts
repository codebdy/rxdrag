import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const advancedLoopSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}