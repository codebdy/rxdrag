import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const sumArraySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}