import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { INodeSchema } from "@rxdrag/schema";

export const displaySetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "DisplaySetter",
      "x-field": {
        type: "fragment",
        fragmentFields: [
          {
            name: "display",
          },
          {
            name: "flexDirection",
          },
          {
            name: "flexWrap",
          },
          {
            name: "alignContent",
          },
          {
            name: "justifyContent",
          },
          {
            name: "alignItems",
          },
        ],
        params:{
          withBind: true,
        }
      },
      props: {
        title: "$display",
      },
    },
  ]
}