import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const arrayToTreeSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}