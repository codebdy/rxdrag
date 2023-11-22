import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { ControllerScopeType } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-data": {
        name: "rowKey",
        label: "$rowKey",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "bordered",
        label: "$bordered",
      }
    },
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
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
        defaultValue: "large",
      },
      "x-data": {
        name: "size",
        label: "$size",
      }
    },
    {
      componentName: "Select",
      props: {
        options: [
          {
            label: "$false",
            value: false,
          },
          {
            label: "$topLeft",
            value: "topLeft"
          },
          {
            label: "$topCenter",
            value: "topCenter"
          },
          {
            label: "$topRight",
            value: "topRight"
          },
          {
            label: "$bottomLeft",
            value: "bottomLeft"
          },
          {
            label: "$bottomCenter",
            value: "bottomCenter"
          },
          {
            label: "$bottomRight",
            value: "bottomRight"
          },
        ],
        defaultValue: "bottomRight",
      },
      "x-data": {
        name: "paginationPosition",
        label: "$paginationPosition",
      }
    },
  ],
  slotSchemas: [
    {
      name: "header",
      label: "$header",
    },
    {
      name: "footer",
      label: "$footer",
    },
    {
      name: "summary",
      label: "$summary",
    },
  ],
  field: {
    fieldType: "array",
  },
  ctrlScopeType: ControllerScopeType.array,
}

export const materialSchema: INodeSchema = createSchema(options)