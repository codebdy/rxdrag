import { INodeSchema } from "core";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";

export const borderRediusSetter: INodeSchema<IFieldMeta<IBindParams>> = {
  componentName: "Fold",
  children: [
    {
      componentName: "BorderRadiusSetter",
      "x-field": {
        type: "fragment",
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
        ],
        params:{
          withBind: true,
        }
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