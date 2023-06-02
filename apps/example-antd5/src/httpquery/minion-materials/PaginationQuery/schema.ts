import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const paginationQuerySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}