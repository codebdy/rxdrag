import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const dataQuerySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}