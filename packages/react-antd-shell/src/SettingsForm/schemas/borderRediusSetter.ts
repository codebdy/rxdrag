import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema, IFieldMeta } from "@rxdrag/schema";

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