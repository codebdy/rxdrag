import { INodeSchema } from "core";
import { labelSchema } from "./base";

export const mergeSchema: INodeSchema = {
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
          "x-field": {
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
  ],
}