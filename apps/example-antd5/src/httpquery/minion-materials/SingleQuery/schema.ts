import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const dataQuery2Schema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}