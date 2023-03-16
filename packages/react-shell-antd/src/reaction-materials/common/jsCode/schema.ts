import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const jsCodeSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$outputPorts",
      },
      children: [
        {
          componentName: "PortsInput",
          "x-field": {
            name: "outPorts",
            params: {
              withBind: true,
            }
          },
          props: {
            title: "$configPorts",
            popoverTitle: "$outputPortsConfig",
            type: "output",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$expression",
      },
      children: [
        {
          componentName: "TextArea",
          "x-field": {
            name: "config.expression",
            params: {
              withBind: true,
            }
          },
          props:{
            defaultValue:
`({ inputValue, outputs }) => {
  const { output } = outputs;
  output('not implement');
}`
          }
        }
      ]
    },
  ],
}