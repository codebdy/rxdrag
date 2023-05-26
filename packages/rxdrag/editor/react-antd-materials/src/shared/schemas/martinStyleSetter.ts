import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";

export const martinStyleSetter: INodeSchema<IFieldMeta<IBindParams>> = {
  componentName: "Fold",
  children: [
    {
      componentName: "MarginStyleSetter",
      "x-field": {
        type: "fragment",
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
        ],
        params:{
          withBind: true,
        }
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