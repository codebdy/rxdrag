import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

export const borderSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "BorderSetter",
      "x-field": {
        type: "fragment",
        withControl: true,
        fragmentFields: [
          {
            name: "borderTop",
          },
          {
            name: "borderRight",
          },
          {
            name: "borderBottom",
          },
          {
            name: "borderLeft",
          },
        ]
      },
      props: {
        title: "$border",
      },
    },
  ]
}