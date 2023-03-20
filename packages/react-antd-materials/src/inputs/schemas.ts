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
          params: {
            withBind: true,
          }
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
      label: "$autoFocus",
    },

    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "autoFocus",
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
      label: "$allowClear",
    },

    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "allowClear",
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
      label: "$bordered",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "bordered",
          params:{
            valuePropName: "checked",
            withBind: true,
          }
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
          params: {
            withBind: true,
          }
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