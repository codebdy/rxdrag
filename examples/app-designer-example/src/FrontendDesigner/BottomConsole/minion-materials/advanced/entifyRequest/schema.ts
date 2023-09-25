import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const constValueSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}