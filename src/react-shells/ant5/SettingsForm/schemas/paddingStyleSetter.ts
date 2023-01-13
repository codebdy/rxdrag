import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

export const paddingStyleSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "PaddingStyleSetter",
      "x-field": {
        type: "fragment",
        withControl: true,
        fragmentFields: [
          {
            name: "paddingTop",
          },
          {
            name: "paddingRight",
          },
          {
            name: "paddingBottom",
          },
          {
            name: "paddingLeft",
          },
        ]
      },
      props: {
        title: "$padding",
        topTitle: "$paddingTop",
        rightTitle: "$paddingRight",
        leftTitle: "$paddingLeft",
        bottomTitle: "$paddingBottom",
      },
    },
  ]
}