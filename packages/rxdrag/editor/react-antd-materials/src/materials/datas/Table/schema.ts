import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "rowKey",
        label: "$rowKey",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "bordered",
        label: "$bordered",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "size",
        label: "$size",
      },
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
      }
    },
    {
      componentName: "Select",
      "x-field": {
        name: "pagination",
        label: "$pagination",
      },
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
      }
    },
  ],
  slotsSchemas: [
    {
      componentName: "SlotSwitch",
      props: {
        name: "header",
      },
      "x-field": {
        label: "$header",
      },
    },
    {
      componentName: "SlotSwitch",
      props: {
        name: "footer",
      },
      "x-field": {
        label: "$footer",
      },
    },
    {
      componentName: "SlotSwitch",
      props: {
        name: "summary",
      },
      "x-field": {
        label: "$summary",
      },
    },
  ],
  fieldOptions: {
    canBindField: false,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))