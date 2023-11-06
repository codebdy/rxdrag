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
    "x-data": {
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
    "x-data": {
      name: "pattern",
      label: "$patternType",
    }
  },
]