import { INodeSchema } from "core";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";

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