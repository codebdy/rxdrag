import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const dataQuerySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "URL",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.rootUrl",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$entityName",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.entityName",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$dataPath",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.dataPath",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$idName",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.idName",
          },
        }
      ]
    },
  ],
}