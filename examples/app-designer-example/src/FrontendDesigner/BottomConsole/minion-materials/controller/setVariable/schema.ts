import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const variableSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "VariableSelect",
      "x-field": {
        name: "config.param",
        params: {
          withBind: true,
        }
      },
    }
  ],
}