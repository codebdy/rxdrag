import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

export const borderRediusSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "BorderRadiusSetter",
      "x-field": {
        type: "fragment",
        withControl: true,
        fragmentFields: [
          {
            name: "borderTopLeftRadius",
          },
          {
            name: "borderTopRightRadius",
          },
          {
            name: "borderBottomRightRadius",
          },
          {
            name: "borderBottomLeftRadius",
          },
        ]
      },
      props: {
        title: "$borderRadius",
        leftTopTitle: "$borderTopLeftRadius",
        rightTopTitle: "$borderTopRightRadius",
        leftBottomTitle: "$borderBottomLeftRadius",
        rightBottomTitle: "$borderBottomRightRadius",
      },
    },
  ]
}