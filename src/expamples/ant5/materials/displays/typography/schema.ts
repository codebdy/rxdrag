export const typographySchema = [
  {
    componentName: "Select",
    "x-field": {
      name: "type",
      label: "$type",
    },
    props: {
      options: [
        {
          label: "",
          value: "",
        },
        {
          label: "Secondary",
          value: "secondary",
        },
        {
          label: "Success",
          value: "success",
        },
        {
          label: "Warning",
          value: "warning",
        },
        {
          label: "Danger",
          value: "danger",
        },
      ]
    }
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "code",
      label: "$code",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "delete",
      label: "$delete",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "disabled",
      label: "$disabled",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "ellipsis",
      label: "$ellipsis",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "mark",
      label: "$mark",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "italic",
      label: "$italic",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-field": {
      name: "underline",
      label: "$underline",
      params: {
        valuePropName: "checked",
      }
    },
  },
]