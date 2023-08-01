export const inputBaseSchemas = [
  {
    componentName: "Input",
    "x-field": {
      name: "placeholder",
      label: "$placeholder",
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "disabled",
      label: "$disabled",
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "autoFocus",
      label: "$autoFocus",
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "allowClear",
      label: "$allowClear",
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "bordered",
      label: "$bordered",
    },
    props: {
      defaultChecked: true,
    }
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
      defaultValue: "middle",
    }
  },
]