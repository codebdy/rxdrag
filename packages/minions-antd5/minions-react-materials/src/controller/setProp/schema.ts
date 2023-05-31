import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const propSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "PropSelect",
      "x-field": {
        name: "config.param",
        params: {
          withBind: true,
        }
      },
    },
  ],
}