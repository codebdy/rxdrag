import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const objectToUrlSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}