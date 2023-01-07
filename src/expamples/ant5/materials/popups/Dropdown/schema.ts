import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const materialSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$arrow",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "arrow",
          valuePropName: "checked",
        },
      }
    ]
  },
])