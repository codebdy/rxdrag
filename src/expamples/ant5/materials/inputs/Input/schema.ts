import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";
import { inputBaseSchemas } from "../schemas";

const inputPros = [
  ...inputBaseSchemas,
  {
    componentName: "FormItem",
    props: {
      label: "$showCount",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "showCount",
          valuePropName: "checked",
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$maxLength",
    },
    children: [
      {
        componentName: "InputNumber",
        "x-field": {
          name: "maxLength",
        },
      }
    ]
  },
]

const inputSlots = [
  {
    componentName: "FormItem",
    props: {
      label: "$addonBefore",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "addonBefore"
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$addonAfter",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "addonAfter"
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$prefix",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "prefix"
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$suffix",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "suffix"
        }
      }
    ]
  },
]
export const inputSchema: INodeSchema = createSchema(
  inputPros,
  inputSlots
)

export const textAreaSchema: INodeSchema = createSchema(
  [...inputPros,
  {
    componentName: "FormItem",
    props: {
      label: "$rows",
    },
    children: [
      {
        componentName: "InputNumber",
        "x-field": {
          name: "rows",
        },
      }
    ]
  },
  ],
  inputSlots
)