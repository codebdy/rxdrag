import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

const inputPros = [
  {
    componentName: "FormItem",
    props: {
      label: "$placeholder",
    },

    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "placeholder",
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$disabled",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "disabled",
          valuePropName: "checked",
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$allowClear",
    },

    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "allowClear",
          valuePropName: "checked",
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$bordered",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "bordered",
          valuePropName: "checked",
        },
        props: {
          defaultChecked: true,
        }
      }
    ]
  },
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