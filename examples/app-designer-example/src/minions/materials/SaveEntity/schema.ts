import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const schema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$entity",
      },
      children: [
        {
          componentName: "EntitySelect",
          "x-data": {
            name: `config.entityId`
          },
        }
      ]
    },
  ],
}