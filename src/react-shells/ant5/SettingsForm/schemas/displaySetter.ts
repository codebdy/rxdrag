import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

export const displaySetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "DisplaySetter",
      "x-field": {
        type: "fragment",
        withControl: true,
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
        ]
      },
      props: {
        title: "$display",
      },
    },
  ]
}