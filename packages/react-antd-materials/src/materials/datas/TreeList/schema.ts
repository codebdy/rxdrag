import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { ControllerScopeType } from "@rxdrag/minions-runtime-react";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        label: "$title",
        name: "title",
      }
    },

    {
      componentName: "Switch",
      "x-data": {
        label: "$readOnly",
        name: "readOnly",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$block",
        name: "block",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$danger",
        name: "danger",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$ghost",
        name: "ghost",
      }
    },
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$default",
            value: "default"
          },
          {
            label: "$circle",
            value: "circle"
          },
          {
            label: "$round",
            value: "round"
          },
        ],
        defaultValue: "default",
      },
      "x-data": {
        label: "$shape",
        name: "shape",
      }
    },
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$large",
            value: "large"
          },
          {
            label: "$middle",
            value: "middle"
          },
          {
            label: "$small",
            value: "small"
          },
        ],
        defaultValue: "middle",
      },
      "x-data": {
        label: "$size",
        name: "size",
      }
    },
  ],
  field: {
    //主要为了显示实体选择列表，实际不会使用该字段
    fieldType: "object",
  },
  ctrlScopeType: ControllerScopeType.tree,
}

export const schema: INodeSchema = createSchema(schemaOptions)