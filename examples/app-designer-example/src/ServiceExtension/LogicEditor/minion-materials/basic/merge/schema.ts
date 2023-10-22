import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

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
          "x-data": {
            name: "inPorts",
            params: {
              withBind: true,
            }
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