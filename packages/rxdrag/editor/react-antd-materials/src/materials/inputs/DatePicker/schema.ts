import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const options: SchemaOptions = {
  propSchemas: [
    ...inputBaseSchemas,
    {
      componentName: "Select",
      "x-field": {
        name: "mode",
        label: "$mode",
      },
      props: {
        options: [
          {
            value: 'time',
            label: 'Time',
          },
          {
            value: 'date',
            label: 'Date',
          },
          {
            value: 'month',
            label: 'Month',
          },
          {
            value: 'year',
            label: 'Year',
          },
          {
            value: 'decade',
            label: 'Decade',
          },
        ]
      }
    },
    {
      componentName: "Select",
      "x-field": {
        name: "picker",
        label: "$mode",
      },
      props: {
        defaultValue: "year",
        options: [
          {
            value: 'date',
            label: 'Date',
          },
          {
            value: 'week',
            label: 'Week',
          },
          {
            value: 'month',
            label: 'Month',
          },
          {
            value: 'quarter',
            label: 'Quarter',
          },
          {
            value: 'year',
            label: 'Year',
          },
        ]
      }
    },
    {
      componentName: "Select",
      "x-field": {
        name: "placement",
        label: "$mode",
      },
      props: {
        defaultValue: "bottomLeft",
        options: [
          {
            value: 'bottomLeft',
            label: 'BottomLeft',
          },
          {
            value: 'bottomRight',
            label: 'BottomRight',
          },
          {
            value: 'topLeft',
            label: 'TopLeft',
          },
          {
            value: 'topRight',
            label: 'TopRight',
          },
        ]
      }
    },
    {
      componentName: "Input",
      "x-field": {
        name: "format",
        label: "$format",
      },
      props: {
        defaultValue: "YYYY-MM-DD"
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "showNow",
        label: "$showNow",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "showTime",
        label: "$showTime",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "showToday",
        label: "$showToday",
      },
      props: {
        defaultChecked: true,
      }
    },
  ]
}

export const datePickerSchema: INodeSchema = createSchema(options)