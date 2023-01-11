import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const materialSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$themeMode",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "themeMode",
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$inherit",
                value: "inherit"
              },
              {
                label: "$dark",
                value: "dark"
              },
              {
                label: "$light",
                value: "light"
              },
            ],
            defaultValue: "inherit",
          }
        }
      ]
    },
  ]
)