export const inputBaseSchemas = [
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
      label: "$autoFocus",
    },

    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "autoFocus",
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
      label: "$size",
    },
    children: [
      {
        componentName: "Radio.Group",
        "x-field": {
          name: "size",
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
  },
]