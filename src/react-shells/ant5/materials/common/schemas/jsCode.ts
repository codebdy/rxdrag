import { INodeSchema } from "core";
import { labelSchema } from "../../basic/schemas/base";

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
          },
        }
      ]
    },
  ],
}