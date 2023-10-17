export const fieldDisplaySchema = [
  {
    componentName: "Select",
    props: {
      options: [
        {
          value: "none",
          label: "$none"
        },
        {
          value: "hidden",
          label: "$hiddenUi"
        },
        {
          value: "visible",
          label: "$visible"
        },
      ],
      allowClear: true,
    },
    "x-field": {
      name: "display",
      label: "$display",
    }
  },
  {
    componentName: "Select",
    props: {
      options: [
        {
          value: "editable",
          label: "$editable"
        },
        {
          value: "disabled",
          label: "$disabled"
        },
        {
          value: "readOnly",
          label: "$readOnly"
        },
        {
          value: "readPretty",
          label: "$readPretty"
        },
      ],
      allowClear: true,
    },
    "x-field": {
      name: "pattern",
      label: "$patternType",
    }
  },
]