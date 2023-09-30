import { INodeSchema } from "@rxdrag/schema";

export const propSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
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