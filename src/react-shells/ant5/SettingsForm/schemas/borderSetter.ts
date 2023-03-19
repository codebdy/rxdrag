import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

export const borderSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "BorderSetter",
      "x-field": {
        type: "fragment",
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
        ],
        params:{
          withBind: true,
        }
      },
      props: {
        title: "$border",
      },
    },
  ]
}