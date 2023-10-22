export const inputBaseSchemas = [
  {
    componentName: "Input",
    "x-data": {
      name: "placeholder",
      label: "$placeholder",
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "disabled",
      label: "$disabled",
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "autoFocus",
      label: "$autoFocus",
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "allowClear",
      label: "$allowClear",
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "bordered",
      label: "$bordered",
    },
    props: {
      defaultChecked: true,
    }
  },
  {
    componentName: "Radio.Group",
    "x-data": {
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