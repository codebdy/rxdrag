import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const jsCodeSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$inputPorts",
      },
      children: [
        {
          componentName: "PortsInput",
          "x-data": {
            name: "inPorts",
          },
          props: {
            title: "$configPorts",
            popoverTitle: "$inputPortsConfig",
            type: "input",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$outputPorts",
      },
      children: [
        {
          componentName: "PortsInput",
          "x-data": {
            name: "outPorts",
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
          "x-data": {
            name: "config.expression",
          },
          props: {
            defaultValue:
              `({ inputs, outputs }) => {
  const { output } = outputs;
  output('not implement');
}`
          }
        }
      ]
    },
  ],
}