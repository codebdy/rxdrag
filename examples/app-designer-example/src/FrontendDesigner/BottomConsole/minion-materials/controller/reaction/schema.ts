import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const reactionSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "ReactionSelect",
      "x-field": {
        name: "config.param",
        params: {
          withBind: true,
        }
      },
    },
  ],
}