import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const options: SchemaOptions = {
  propSchemas: [
    ...inputBaseSchemas,
    {
      componentName: "Select",
      "x-data": {
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
      "x-data": {
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
      "x-data": {
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
      "x-data": {
        name: "format",
        label: "$format",
      },
      props: {
        defaultValue: "YYYY-MM-DD"
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "showNow",
        label: "$showNow",
      },
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "showTime",
        label: "$showTime",
      },
    },
    {
      componentName: "Switch",
      "x-data": {
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