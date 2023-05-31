import { INodeSchema } from "@rxdrag/schema";

export const setPropSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    {
      componentName: "PropSelect",
      "x-field": {
        name: "config.prop",
        params: {
          withBind: true,
        }
      },
    },
  ],
}