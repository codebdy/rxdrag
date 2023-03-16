import { INodeSchema } from "@rxdrag/schema";

export const setPropSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    {
      componentName: "FormItem",
      props: {
        label: "$prop",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.prop",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}