import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const querySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$entity",
      },
      children: [
        {
          componentName: "EntitySelect",
          "x-data": {
            name: `config.entityId`
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$queryParams",
      },
      children: [
        {
          componentName: "QueryParamsInput",
          "x-data": {
            name: "config"
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$pageSize",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: `config.pageSize`,
            defaultValue: 10,
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$queryOnFocus",
      },
      children: [
        {
          componentName: "Switch",
          "x-data": {
            name: "config.queryOnFocus"
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$pollingTime",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: "config.pollingTime"
          },
        }
      ]
    },
  ],
}