import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

export const martinStyleSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "MarginStyleSetter",
      "x-field": {
        type: "fragment",
        withControl: true,
        fragmentFields: [
          {
            name: "marginTop",
          },
          {
            name: "marginRight",
          },
          {
            name: "marginBottom",
          },
          {
            name: "marginLeft",
          },
        ]
      },
      props: {
        title: "$margin",
        topTitle: "$marginTop",
        rightTitle: "$marginRight",
        leftTitle: "$marginLeft",
        bottomTitle: "$marginBottom",
      },
    },
  ]
}