import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const schema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$content",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "content",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$mode",
      },
      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "mode",
          },
          props: {
            options: [
              {
                label: "Normal",
                value: "Normal"
              },
              {
                label: "H1",
                value: "h1"
              },
              {
                label: "H2",
                value: "h2"
              },
              {
                label: "H3",
                value: "h3"
              },
              {
                label: "H4",
                value: "h4"
              },
              {
                label: "p",
                value: "p"
              },
            ],
            defaultValue: "default",
          }
        }
      ]
    },
  ]
)