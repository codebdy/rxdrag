import { INodeSchema } from "@rxdrag/schema";

export const propSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    {
      componentName: "PropSelect",
      "x-data": {
        name: "config",
      },
    },
  ],
}