import { INodeSchema } from "core";
import { labelSchema } from "./base";

export const loopSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    // {
    //   componentName: "FormItem",
    //   props: {
    //     label: "$trueExpression",
    //   },
    //   children: [
    //     {
    //       componentName: "TextArea",
    //       "x-field": {
    //         name: "config.trueExpression",
    //       },
    //     }
    //   ]
    // },
  ],
}