import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const collectToArray: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}