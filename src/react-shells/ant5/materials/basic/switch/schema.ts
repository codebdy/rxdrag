import { INodeSchema } from "core";
import { labelSchema } from "../../baseSchema";

export const switchSchema: INodeSchema = {
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
  ],
}