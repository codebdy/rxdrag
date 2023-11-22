export const typographySchema = [
  {
    componentName: "Select",
    "x-data": {
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
    "x-data": {
      name: "code",
      label: "$code",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "delete",
      label: "$delete",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "disabled",
      label: "$disabled",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "ellipsis",
      label: "$ellipsis",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "mark",
      label: "$mark",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "italic",
      label: "$italic",
      params: {
        valuePropName: "checked",
      }
    },
  },
  {
    componentName: "Switch",
    "x-data": {
      name: "underline",
      label: "$underline",
      params: {
        valuePropName: "checked",
      }
    },
  },
]