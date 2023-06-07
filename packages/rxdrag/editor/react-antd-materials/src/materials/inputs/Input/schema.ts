import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
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
          params:{
            valuePropName: "checked",
            withBind: true,
          }
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
          params: {
            withBind: true,
          }
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
const options: SchemaOptions = {
  propsSchemas:inputPros,
  slotsSchemas:inputSlots,
  fieldOptions: {
    canBindField: true,
  },
  events: [
    {
      name: "onChange",
      label: "$onChange",
    }
  ],
}
export const inputSchema: INodeSchema = createSchema(options)

const textareaOptions: SchemaOptions = {
  propsSchemas: [...inputPros,
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
          params: {
            withBind: true,
          }
        },
      }
    ]
  },
  ],
  fieldOptions: {
    canBindField: true,
  }
}
export const textAreaSchema: INodeSchema = createSchema(textareaOptions)