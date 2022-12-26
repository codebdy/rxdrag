import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

export const martinStyleSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "MarginStyleSetter",
      "x-field": {
        type: "fragment",
        withControl: true,
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